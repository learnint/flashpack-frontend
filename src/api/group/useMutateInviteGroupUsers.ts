import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Group } from "models";

export interface PostGroupUsersRequest {
  id: string;
  body: {
    emails: string[];
  };
}

export const useMutateInviteGroupUsers = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const postGroupUsers = async ({ id, body }: PostGroupUsersRequest) => {
    try {
      return await fetcher<Group>(`/group/${id}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          default:
            throw UnknownServerError(error);
        }
      }
      throw SomethingWentWrong(error);
    }
  };

  return useMutation<Group, Error, PostGroupUsersRequest>(
    (request) => postGroupUsers(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("groups");
      },
    }
  );
};
