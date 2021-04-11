import React from "react";
import { Button, Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Group } from "models";
import { useColorScheme } from "theme";
import { BlockLink } from "components/common";
import { Pack } from "./Pack";
import { usePack } from "context";

interface PacksProps {
  group?: Group;
}

export const Packs: React.FC<PacksProps> = ({ children, group }) => {
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  const { packs, isPacksLoading, isPacksError } = usePack();

  const canEdit = group ? group.isAdmin : true;

  if (!isPacksLoading && !isPacksError && packs) {
    return (
      <Switch>
        <Route path={`${path}/:packId`}>
          <Pack packs={packs} group={group} />
        </Route>
        <Route path={path}>
          <Stack w="full" maxW="container.lg">
            <Flex justifyContent="space-between">
              <Heading color={colorScheme}>
                {group ? `${group.name} - ` : "My"} Packs
              </Heading>
              {group ? children : <Button>Create Pack</Button>}
            </Flex>
            {packs.map(({ id, name, description, cardCount }) => (
              <BlockLink
                to={canEdit ? `${url}/${id}` : `/quiz/${id}`}
                name={name}
                description={description}
                onEditClick={canEdit ? () => {} : undefined}
                counts={[{ key: "Cards", value: cardCount }]}
                key={id}
              />
            ))}
          </Stack>
        </Route>
      </Switch>
    );
  }
  return (
    <Stack w="full" maxW="container.lg">
      <Skeleton height="50px" />
      <Skeleton height="3xs" />
      <Skeleton height="3xs" />
      <Skeleton height="3xs" />
    </Stack>
  );
};
