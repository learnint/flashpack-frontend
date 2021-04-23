import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Card, CardType, Option } from "models";

export interface PostCardRequest {
  type: CardType;
  question: string;
  options: Omit<Option, "id">[];
  packId: string;
}

export const useMutateCreateCard = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const postCard = async (request: PostCardRequest) => {
    try {
      return await fetcher<Card>("/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
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

  return useMutation<Card, Error, PostCardRequest>(
    (request) => postCard(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cards");
        queryClient.invalidateQueries("packs");
      },
    }
  );
};
