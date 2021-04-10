import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Group, Pack as PackModel } from "models";
import { useColorScheme } from "theme";
import { BlockLink } from "components/common";
import { Pack } from "./Pack";

const packs: PackModel[] = [
  {
    id: "p1",
    name: "Math Midterm",
    description: "To help me study for my math midterm",
    cardCount: 0,
  },
  {
    id: "p2",
    name: "Science Final",
    description: "To help me study for my science final",
    cardCount: 0,
  },
  {
    id: "p3",
    name: "Trivia!",
    cardCount: 0,
  },
];

const groupPacks: PackModel[] = [
  {
    id: "p4",
    name: "Test 1",
    cardCount: 0,
  },
  {
    id: "p5",
    name: "Test 2",
    cardCount: 0,
  },
  {
    id: "p6",
    name: "Test 3!",
    cardCount: 0,
  },
];

interface PacksProps {
  group?: Group;
}

export const Packs: React.FC<PacksProps> = ({ children, group }) => {
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  const canEdit = group ? group.isAdmin : true;

  return (
    <Switch>
      <Route path={`${path}/:packId`}>
        <Pack packs={group ? groupPacks : packs} group={group} />
      </Route>
      <Route path={path}>
        <Stack w="full" maxW="container.lg">
          <Flex justifyContent="space-between">
            <Heading color={colorScheme}>
              {group ? `${group.name} - ` : "My"} Packs
            </Heading>
            {group ? children : <Button>Create Pack</Button>}
          </Flex>
          {(group ? groupPacks : packs).map(
            ({ id, name, description, cardCount }) => (
              <BlockLink
                to={canEdit ? `${url}/${id}` : `/quiz/${id}`}
                name={name}
                description={description}
                onEditClick={canEdit ? () => {} : undefined}
                counts={[{ key: "Cards", value: cardCount }]}
                key={id}
              />
            )
          )}
        </Stack>
      </Route>
    </Switch>
  );
};
