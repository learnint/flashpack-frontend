import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Group } from "models";

export const useMutateDeleteGroup = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const deleteGroup = async (id: string) => {
    try {
      return await fetcher<Group>(`/group/${id}`, {
        method: "DELETE",
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

  return useMutation<Group, Error, string>((request) => deleteGroup(request), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });
};
