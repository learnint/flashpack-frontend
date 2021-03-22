import { useMutation } from "react-query";
import { SomethingWentWrong, UnknownServerError, useFetcher } from "api/config";
import { User } from "models";

export interface PatchChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const useMutateChangePassword = () => {
  const fetcher = useFetcher();

  const patchChangePassword = async (request: PatchChangePasswordRequest) => {
    try {
      return await fetcher<User>("/user/changePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
    } catch (error) {
      if (error instanceof Response) {
        switch (error.status) {
          case 400:
            throw new Error("Invalid request body");
          case 404:
            throw new Error("Could not find user");
          case 422:
            throw new Error("Old password is not correct");
          default:
            throw UnknownServerError(error);
        }
      }
      throw SomethingWentWrong(error);
    }
  };

  return useMutation<User, Error, PatchChangePasswordRequest>((request) =>
    patchChangePassword(request)
  );
};
