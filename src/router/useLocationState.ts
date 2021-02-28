import { useLocation } from "react-router-dom";

interface LocationState {
  from: {
    pathname: string;
  };
}

export const useLocationState = () => {
  const location = useLocation<LocationState | undefined>();

  return location.state || { from: { pathname: "/" } };
};
