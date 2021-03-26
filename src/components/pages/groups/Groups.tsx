import React from "react";
import { Stack, Heading, Flex, Button } from "@chakra-ui/react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Group as GroupModel } from "models";
import { BlockLink } from "components/common";
import { useColorScheme } from "theme";
import { Group } from "./Group";

const groups: GroupModel[] = [
  {
    id: "g1",
    name: "PROG1820",
    description: "Programming practice",
    tags: ["Programming", "School"],
    users: [],
    packs: [
      {
        id: "p3",
        name: "Quiz 1",
        cards: [],
      },
      {
        id: "p4",
        name: "Quiz 2",
        cards: [],
      },
      {
        id: "p5",
        name: "Quiz 3",
        cards: [],
      },
    ],
  },
  {
    id: "g2",
    name: "MATH101",
    description: "Math class",
    tags: [],
    users: [],
    packs: [
      {
        id: "p7",
        name: "Midterm",
        cards: [],
      },
      {
        id: "p8",
        name: "Final",
        cards: [],
      },
    ],
  },
];

export const Groups: React.FC = () => {
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  return (
    <Stack w="full" maxW="container.lg">
      <Switch>
        <Route path={`${path}/:groupId`}>
          <Group groups={groups} />
        </Route>
        <Route path={path}>
          <Flex justifyContent="space-between">
            <Heading color={colorScheme}>Groups</Heading>
            <Button>Create New Group</Button>
          </Flex>
          {groups.map(({ id, name, description, packs, users }) => (
            <BlockLink
              to={`${url}/${id}`}
              name={name}
              description={description}
              counts={[
                { key: "Packs", value: packs.length },
                { key: "Members", value: users.length },
              ]}
              key={id}
            />
          ))}
        </Route>
      </Switch>
    </Stack>
  );
};
