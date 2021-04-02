import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Group } from "models";

export interface PostGroupRequest {
  name: string;
  description?: string;
  tags?: string[];
}

export const useMutateCreateGroup = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const postGroup = async (request: PostGroupRequest) => {
    try {
      return await fetcher<Group>("/group", {
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

  return useMutation<Group, Error, PostGroupRequest>(
    (request) => postGroup(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("groups");
      },
    }
  );
};
