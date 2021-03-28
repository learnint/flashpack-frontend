import { useQuery, UseQueryOptions } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Group } from "models";

export const useQueryGroups = (
  options?: UseQueryOptions<Group[], Error, Group[]>
) => {
  const fetcher = useFetcher();

  const getGroups = async () => {
    try {
      return await fetcher<Group[]>("/groups");
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

  return useQuery<Group[], Error>("groups", getGroups, options);
};
