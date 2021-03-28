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
    isAdmin: true,
    isJoined: true,
    tags: ["Programming", "School"],
    users: [],
  },
  {
    id: "g2",
    name: "MATH101",
    description: "Math class",
    isJoined: true,
    isAdmin: false,
    tags: [],
    users: [],
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
            <Button>Create Group</Button>
          </Flex>
          {groups.map(({ id, name, description, isAdmin, users }) => (
            <BlockLink
              to={`${url}/${id}`}
              name={name}
              description={description}
              isEditable={isAdmin}
              counts={[
                { key: "Packs", value: 0 },
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
