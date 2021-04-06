import React from "react";
import { Heading } from "@chakra-ui/react";
import { Redirect, useParams } from "react-router-dom";
import { Pack as PackModel } from "models";
import { useColorScheme } from "theme";

interface PackProps {
  packs: PackModel[];
  groupId?: string;
}

export const Pack: React.FC<PackProps> = ({ packs, groupId }) => {
  const { packId } = useParams<{ packId: string }>();
  const colorScheme = useColorScheme();

  const pack = packs.find((pack) => pack.id === packId);

  return (
    <>
      {pack ? (
        <Heading color={colorScheme}>{pack.name}</Heading>
      ) : (
        <Redirect to={groupId ? `/groups/${groupId}/packs` : `/packs`} />
      )}
    </>
  );
};
