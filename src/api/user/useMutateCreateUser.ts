import { useMutation } from "react-query";
import { fetcher } from "api/config";
import { User } from "models";

export interface PostUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useMutateCreateUser = () => {
  const postUser = async (request: PostUserRequest) => {
    try {
      return await fetcher<User>("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          case 409:
            throw new Error("Email is already taken");
          default:
            throw new Error(`Unknown server error occured: ${error.status}`);
        }
      }
      throw new Error(`Something went wrong: ${error.message || error}`);
    }
  };

  return useMutation<User, Error, PostUserRequest>((request) =>
    postUser(request)
  );
};
