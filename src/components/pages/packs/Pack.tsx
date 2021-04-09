import React from "react";
import { Heading } from "@chakra-ui/react";
import { Redirect, useParams } from "react-router-dom";
import { Pack as PackModel, Group } from "models";
import { useColorScheme } from "theme";

interface PackProps {
  packs: PackModel[];
  group?: Group;
}

export const Pack: React.FC<PackProps> = ({ packs, group }) => {
  const { packId } = useParams<{ packId: string }>();
  const colorScheme = useColorScheme();

  const pack = packs.find((pack) => pack.id === packId);

  return (
    <>
      {pack ? (
        <Heading color={colorScheme}>
          {group ? `${group.name} - ` : null}
          {pack.name}
        </Heading>
      ) : (
        <Redirect to={group ? `/groups/${group.id}/packs` : `/packs`} />
      )}
    </>
  );
};
