import { useToast } from "components/common";
import { useAuth } from "auth";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://flashpack.learntint.ca"
    : "http://localhost:8080";

export const fetcher = async <T>(path: string, options?: RequestInit) => {
  const response = await fetch(`${baseUrl}/api${path}`, options);

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<T>;
};

export const useFetcher = () => {
  const { accessToken, logout } = useAuth();
  const toast = useToast();

  const internalFetcher = async <T>(path: string, options?: RequestInit) => {
    try {
      return await fetcher<T>(path, {
        ...options,
        headers: {
          ...(accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined),
          ...options?.headers,
        },
      });
    } catch (error) {
      if (error instanceof Response && error.status === 401) {
        logout();
        // TODO: toast doesn't follow dark theme on refresh
        toast({
          title: "Invalid token, please login",
          status: "error",
        });
      }
      throw error;
    }
  };

  return internalFetcher;
};

export const UnknownServerError = (error: Response) =>
  new Error(`Unknown server error occured: ${error.status}`);

export const SomethingWentWrong = (error: any) =>
  new Error(`Something went wrong: ${error.message || error}`);
