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
    cards: [],
  },
  {
    id: "p2",
    name: "Science Final",
    description: "To help me study for my science final",
    cards: [],
  },
  {
    id: "p3",
    name: "Trivia!",
    cards: [],
  },
];

const groupPacks: PackModel[] = [
  {
    id: "p4",
    name: "Test 1",
    cards: [],
  },
  {
    id: "p5",
    name: "Test 2",
    cards: [],
  },
  {
    id: "p6",
    name: "Test 3!",
    cards: [],
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
            ({ id, name, description, cards }) => (
              <BlockLink
                to={`${url}/${id}`}
                name={name}
                description={description}
                onEditClick={canEdit ? () => {} : undefined}
                counts={[{ key: "Cards", value: cards.length }]}
                key={id}
              />
            )
          )}
        </Stack>
      </Route>
    </Switch>
  );
};
