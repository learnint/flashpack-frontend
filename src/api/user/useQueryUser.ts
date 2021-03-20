import { useQuery } from "react-query";
import { useFetcher } from "api/config";
import { User } from "models";

export const useQueryUser = () => {
  const fetcher = useFetcher();

  const getUser = async () => {
    try {
      return await fetcher<User>("/user");
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          default:
            throw new Error(`Unknown server error occured: ${error.status}`);
        }
      }
      throw new Error(`Something went wrong: ${error.message || error}`);
    }
  };

  return useQuery<User, Error>("user", getUser);
};
