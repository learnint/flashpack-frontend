import React from "react";
import { Box, Button, Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { usePack } from "context";
import { Group } from "models";
import { useColorScheme } from "theme";
import { BlockLink } from "components/common";
import { Pack } from "./Pack";
import { CreatePack } from "./create";

interface PacksProps {
  group?: Group;
}

export const Packs: React.FC<PacksProps> = ({ children, group }) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  const { packs, isPacksLoading, isPacksError } = usePack();

  const isAdmin = group ? group.isAdmin : true;

  if (!isPacksLoading && !isPacksError && packs) {
    return (
      <Switch>
        <Route path={`${path}/create`}>
          <CreatePack group={group} />
        </Route>
        <Route path={`${path}/:packId`}>
          <Pack isAdmin={isAdmin} packs={packs} />
        </Route>
        <Route path={path}>
          <Stack w="full" maxW="container.lg">
            <Flex justifyContent="space-between">
              <Heading color={colorScheme}>
                {group ? `${group.name} -` : "My"} Packs
              </Heading>
              <Flex justifyContent="flex-end" wrap="wrap">
                {group ? (
                  <Box ml="2" mb="2">
                    {children}
                  </Box>
                ) : null}
                {isAdmin ? (
                  <Button ml="2" onClick={() => history.push(`${url}/create`)}>
                    Create Pack
                  </Button>
                ) : null}
              </Flex>
            </Flex>
            {packs.map(({ id, name, description, cardCount }) => (
              <BlockLink
                to={isAdmin ? `${url}/${id}` : `/quiz/${id}`}
                name={name}
                description={description}
                onEditClick={
                  isAdmin
                    ? () => history.push(`${url}/${id}/settings`)
                    : undefined
                }
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
