import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Group } from "models";

export interface PutGroupRequest {
  id: string;
  body: {
    name: string;
    description?: string;
    tags?: string[];
  };
}

export const useMutateUpdateGroup = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const putGroup = async ({ id, body }: PutGroupRequest) => {
    try {
      return await fetcher<Group>(`/group/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          case 400:
            throw new Error("Invalid request body");
          case 403:
            throw new Error("User forbidden from performing this action");
          case 404:
            throw new Error("Group not found");
          default:
            throw UnknownServerError(error);
        }
      }
      throw SomethingWentWrong(error);
    }
  };

  return useMutation<Group, Error, PutGroupRequest>(
    (request) => putGroup(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("groups");
      },
    }
  );
};
