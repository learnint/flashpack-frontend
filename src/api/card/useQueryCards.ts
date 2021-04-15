import { useQuery, UseQueryOptions } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Card } from "models";

export const useQueryCards = (
  packId: string,
  options?: UseQueryOptions<Card[], Error, Card[]>
) => {
  const fetcher = useFetcher();

  const getCard = async (packId: string) => {
    try {
      return await fetcher<Card[]>(`/cards/pack/${packId}`);
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

  return useQuery<Card[], Error>(
    ["cards", packId],
    () => getCard(packId),
    options
  );
};
