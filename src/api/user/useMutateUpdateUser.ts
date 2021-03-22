import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { User } from "models";

export interface PutUserRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export const useMutateUpdateUser = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const putUser = async (request: PutUserRequest) => {
    try {
      return await fetcher<User>("/user", {
        method: "PUT",
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
            throw UnknownServerError(error);
        }
      }
      throw SomethingWentWrong(error);
    }
  };

  return useMutation<User, Error, PutUserRequest>(
    (request) => putUser(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};
