import { useQuery } from "react-query";
import { fetcher } from "api/config";
import { User } from "models";

export const getUser = async () => {
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

export const useQueryUser = () => {
  return useQuery<User, Error>("user", getUser);
};
