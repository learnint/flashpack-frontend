import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Card, CardType, Option } from "models";

export interface PutCardRequest {
  id: string;
  body: {
    type: CardType;
    question: string;
    options: Omit<Option, "id">[];
  };
}

export const useMutateUpdateCard = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const putCard = async ({ id, body }: PutCardRequest) => {
    try {
      return await fetcher<Card>(`/card/${id}`, {
        method: "PUT",
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

  return useMutation<Card, Error, PutCardRequest>(
    (request) => putCard(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cards");
        queryClient.invalidateQueries("packs");
      },
    }
  );
};
