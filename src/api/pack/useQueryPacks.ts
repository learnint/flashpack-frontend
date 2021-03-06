import { useQuery, UseQueryOptions } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Pack } from "models";

export const useQueryPacks = (
  groupId?: string,
  options?: UseQueryOptions<Pack[], Error, Pack[]>
) => {
  const fetcher = useFetcher();

  const getPacks = async (groupId: string | undefined) => {
    try {
      return await fetcher<Pack[]>(
        groupId ? `/packs?groupId=${groupId}` : "/packs"
      );
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

  return useQuery<Pack[], Error>(
    ["packs", groupId],
    () => getPacks(groupId),
    options
  );
};
