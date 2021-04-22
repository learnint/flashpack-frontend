import { useQuery, UseQueryOptions } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Card, Pack } from "models";

type QuizPack = Pack & { cards: Card[] };

export const useQueryPack = (
  packId: string,
  options?: UseQueryOptions<QuizPack, Error, QuizPack>
) => {
  const fetcher = useFetcher();

  const getPack = async (packId: string) => {
    try {
      return await fetcher<QuizPack>(`/pack/${packId}`);
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

  return useQuery<QuizPack, Error>(
    ["pack", packId],
    () => getPack(packId),
    options
  );
};
