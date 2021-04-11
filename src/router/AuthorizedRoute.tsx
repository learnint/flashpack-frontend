import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "auth";

interface AuthorizedRouteProps {
  path: string;
  exact?: boolean;
}

export const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  children,
  path,
  exact,
}) => {
  const { accessToken } = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
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
