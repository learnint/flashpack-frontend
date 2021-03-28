import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Group } from "models";

export const useMutateJoinGroup = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const patchGroupJoin = async (id: string) => {
    try {
      return await fetcher<Group>(`/group/${id}/join`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
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

  return useMutation<Group, Error, string>(
    (request) => patchGroupJoin(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("groups");
      },
    }
  );
};
