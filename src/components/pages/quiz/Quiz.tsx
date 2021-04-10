import React from "react";
import { useParams } from "react-router-dom";

export const Quiz: React.FC = () => {
  const { packId } = useParams<{ packId: string }>();
  return <div>Quiz for packId={packId}</div>;
};
