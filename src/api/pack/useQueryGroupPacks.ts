import { useQuery, UseQueryOptions } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Pack } from "models";

export const useQueryGroupPacks = (
  groupId: string | undefined,
  options?: UseQueryOptions<Pack[], Error, Pack[]>
) => {
  const fetcher = useFetcher();

  const getGroupPacks = async (groupId: string | undefined) => {
    try {
      return await fetcher<Pack[]>(`/packs/group/${groupId}`);
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
    ["groupPacks", groupId],
    () => getGroupPacks(groupId),
    {
      enabled: !!groupId,
      ...options,
    }
  );
};
