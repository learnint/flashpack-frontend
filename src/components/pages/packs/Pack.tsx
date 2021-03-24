import React from "react";
import { useParams } from "react-router-dom";

export const Pack: React.FC = () => {
  const { packId } = useParams<{ packId: string }>();
  return <div>{packId}</div>;
};
