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
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={() => (!auth.user ? children : <Redirect to="/" />)}
    />
  );
};
