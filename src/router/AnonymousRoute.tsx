import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "auth";

interface AnonymousRouteProps {
  path: string;
}

export const AnonymousRoute: React.FC<AnonymousRouteProps> = ({
  children,
  path,
}) => {
  const { accessToken } = useAuth();

  return (
    <Route
      path={path}
      render={() => (!accessToken ? children : <Redirect to="/" />)}
    />
  );
};
