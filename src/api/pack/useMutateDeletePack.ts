import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Pack } from "models";

export const useMutateDeletePack = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const deletePack = async (id: string) => {
    try {
      return await fetcher<Pack>(`/pack/${id}`, {
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

  return useMutation<Pack, Error, string>((request) => deletePack(request), {
    onSuccess: () => {
      queryClient.invalidateQueries("packs");
    },
  });
};
