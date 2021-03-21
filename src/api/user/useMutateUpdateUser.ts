import { useMutation, useQueryClient } from "react-query";
import { useFetcher } from "api/config";
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
            throw new Error(`Unknown server error occured: ${error.status}`);
        }
      }
      throw new Error(`Something went wrong: ${error.message || error}`);
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
