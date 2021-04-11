import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { Pack } from "models";

export interface PutPackRequest {
  id: string;
  body: {
    name: string;
    description?: string;
  };
}

export const useMutateUpdatePack = () => {
  const queryClient = useQueryClient();

  const fetcher = useFetcher();

  const putPack = async ({ id, body }: PutPackRequest) => {
    try {
      return await fetcher<Pack>(`/pack/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

  return useMutation<Pack, Error, PutPackRequest>(
    (request) => putPack(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("packs");
      },
    }
  );
};
