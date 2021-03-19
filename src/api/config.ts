const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://flashpack.learntint.ca"
    : "http://localhost:8080";

export const fetcher = async <T>(path: string, options?: RequestInit) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${baseUrl}/api${path}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : undefined),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<T>;
};
