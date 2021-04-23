import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Card } from "models";

export const useMutateDeleteCard = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const deleteCard = async (id: string) => {
    try {
      return await fetcher<Card>(`/card/${id}`, {
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

  return useMutation<Card, Error, string>((request) => deleteCard(request), {
    onSuccess: () => {
      queryClient.invalidateQueries("cards");
      queryClient.invalidateQueries("packs");
    },
  });
};
