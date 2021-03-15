import { useMutation } from "react-query";

interface PostLoginRequest {
  email: string;
  password: string;
}

const postLogin = async ({ email, password }: PostLoginRequest) => {
  const response = await fetch("url", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${email}:${password}`),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
  return useMutation<string, Error, PostLoginRequest>((request) =>
    postLogin(request)
  );
};
