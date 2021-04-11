import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Pack } from "models";

export interface PostPackRequest {
  groupId?: string;
  body: {
    name: string;
    description?: string;
  };
}

export const useMutateCreatePack = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const postPack = async ({ groupId, body }: PostPackRequest) => {
    try {
      return await fetcher<Pack>(
        groupId ? `/pack?groupId=${groupId}` : "/pack",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
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

  return useMutation<Pack, Error, PostPackRequest>(
    (request) => postPack(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("packs");
      },
    }
  );
};
