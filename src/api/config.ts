const getBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "http://flashpack.learntint.ca";
    case "development":
      return "http://localhost:8080/api";
    default:
      return "http://localhost:8080/api";
  }
};

export const baseUrl = getBaseUrl();

export const fetcher = async <T>(input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<T>;
};
