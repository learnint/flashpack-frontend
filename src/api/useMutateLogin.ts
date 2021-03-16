import { useMutation } from "react-query";
import { baseUrl } from "./config";
import { LoginResponse } from "models";

interface PostLoginRequest {
  email: string;
  password: string;
}

const postLogin = async (request: PostLoginRequest) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (response.ok) {
    return response.json();
  } else if (response.status === 401) {
    throw new Error("Invalid login credentials");
  } else if (response.status === 404) {
    throw new Error("Cannot find server");
  } else {
    throw new Error("Something went wrong");
  }
};

export const useMutateLogin = () => {
  return useMutation<LoginResponse, Error, PostLoginRequest>((request) =>
    postLogin(request)
  );
};
