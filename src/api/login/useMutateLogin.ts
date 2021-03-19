import { useMutation } from "react-query";
import { fetcher } from "api/config";
import { LoginResponse } from "models";

interface PostLoginRequest {
  email: string;
  password: string;
}

const postLogin = async (request: PostLoginRequest) => {
  try {
    return await fetcher<LoginResponse>("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
    if (error instanceof Response) {
      switch (error.status) {
        case 401:
          throw new Error("Invalid login credentials");
        case 404:
          throw new Error("Cannot find server");
        default:
          throw new Error(`Unknown server error occured: ${error.status}`);
      }
    }
    throw new Error(`Something went wrong: ${error.message || error}`);
  }
};

export const useMutateLogin = () => {
  return useMutation<LoginResponse, Error, PostLoginRequest>((request) =>
    postLogin(request)
  );
};
