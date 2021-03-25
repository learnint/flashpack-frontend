import React from "react";
import { useParams } from "react-router-dom";
import { PathParamRedirect } from "router";
import { Pack as PackModel } from "models";

interface PackProps {
  packs: PackModel[];
}

export const Pack: React.FC<PackProps> = ({ packs }) => {
  const { packId } = useParams<{ packId: string }>();
  const pack = packs.find((pack) => pack.id === packId);

  return (
    <>
      {pack ? (
        <>
          <div>{pack.name}</div>
          <div>{pack.description}</div>{" "}
        </>
      ) : (
        <PathParamRedirect />
      )}
    </>
  );
};
