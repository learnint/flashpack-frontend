import { useQuery, UseQueryOptions } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { User } from "models";

export const useQueryUser = (options?: UseQueryOptions<User, Error, User>) => {
  const fetcher = useFetcher();

  const getUser = async () => {
    try {
      return await fetcher<User>("/user");
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          case 404:
            throw new Error("Could not find user");
          default:
            throw UnknownServerError(error);
        }
      }
      throw SomethingWentWrong(error);
    }
  };

  return useQuery<User, Error>("user", getUser, options);
};
