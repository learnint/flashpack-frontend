import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Group } from "models";

export const useMutateLeaveGroup = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const deleteGroupLeave = async (id: string) => {
    try {
      return await fetcher<Group>(`/group/${id}/leave`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          case 400:
            throw new Error("Invalid group ID");
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

  return useMutation<Group, Error, string>(
    (request) => deleteGroupLeave(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("groups");
      },
    }
  );
};
