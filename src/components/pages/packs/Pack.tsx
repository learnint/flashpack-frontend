import React from "react";
import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { PathParamRedirect } from "router";
import { Pack as PackModel } from "models";
import { useColorScheme } from "theme";

interface PackProps {
  packs: PackModel[];
}

export const Pack: React.FC<PackProps> = ({ packs }) => {
  const { packId } = useParams<{ packId: string }>();
  const colorScheme = useColorScheme();

  const pack = packs.find((pack) => pack.id === packId);

  return (
    <>
      {pack ? (
        <Heading color={colorScheme}>{pack.name}</Heading>
      ) : (
        <PathParamRedirect />
      )}
    </>
  );
};
