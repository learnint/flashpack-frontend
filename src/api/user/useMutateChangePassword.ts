import { useMutation } from "react-query";
import { useFetcher } from "api/config";
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
          case 422:
            throw new Error("Old password is not correct");
          default:
            throw new Error(`Unknown server error occured: ${error.status}`);
        }
      }
      throw new Error(`Something went wrong: ${error.message || error}`);
    }
  };

  return useMutation<User, Error, PatchChangePasswordRequest>((request) =>
    patchChangePassword(request)
  );
};
