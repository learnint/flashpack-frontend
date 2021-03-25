import React from "react";
import { Redirect, useRouteMatch } from "react-router-dom";

export const PathParamRedirect: React.FC = () => {
  const { url } = useRouteMatch();

  return <Redirect to={url.substr(0, url.lastIndexOf("/"))} />;
};
