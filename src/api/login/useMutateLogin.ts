import { useMutation } from "react-query";
import { fetcher, SomethingWentWrong, UnknownServerError } from "api/config";
import { LoginResponse } from "models";

export interface PostLoginRequest {
  email: string;
  password: string;
}

export const useMutateLogin = () => {
  const postLogin = async (request: PostLoginRequest) => {
    try {
      return await fetcher<LoginResponse>("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          case 401:
            throw new Error("Invalid login credentials");
          default:
            throw UnknownServerError(error);
        }
      }
      throw SomethingWentWrong(error);
    }
  };

  return useMutation<LoginResponse, Error, PostLoginRequest>((request) =>
    postLogin(request)
  );
};
