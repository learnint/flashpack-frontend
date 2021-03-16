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
