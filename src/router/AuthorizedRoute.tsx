import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "auth";

interface AuthorizedRouteProps {
  path: string;
}

export const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  children,
  path,
}) => {
  const { accessToken } = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
