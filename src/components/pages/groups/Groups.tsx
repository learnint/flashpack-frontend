import React from "react";
import { Stack, Heading, Flex, Button, Skeleton } from "@chakra-ui/react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { BlockLink } from "components/common";
import { useGroup } from "context";
import { useColorScheme } from "theme";
import { Group } from "./Group";

export const Groups: React.FC = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  const { groups, isGroupsLoading, isGroupsError } = useGroup();

  return (
    <Stack w="full" maxW="container.lg">
      {!isGroupsLoading && !isGroupsError && groups ? (
        <Switch>
          <Route path={`${path}/:groupId`}>
            <Group groups={groups} />
          </Route>
          <Route path={path}>
            <Flex justifyContent="space-between">
              <Heading color={colorScheme}>Groups</Heading>
              <Button>Create Group</Button>
            </Flex>
            {groups
              .filter((group) => group.isJoined)
              .map(({ id, name, description, isAdmin, users }) => (
                <BlockLink
                  to={`${url}/${id}`}
                  name={name}
                  description={description}
                  onEditClick={
                    isAdmin
                      ? () => history.push(`${url}/${id}/settings`)
                      : undefined
                  }
                  counts={[
                    { key: "Packs", value: 0 },
                    { key: "Members", value: users.length },
                  ]}
                  key={id}
                />
              ))}
            <Heading size="md">Group Invites</Heading>
            {groups
              .filter((group) => !group.isJoined)
              .map(({ name }) => (
                <div>{name}</div>
              ))}
          </Route>
        </Switch>
      ) : (
        <>
          <Skeleton height="50px" />
          <Skeleton height="3xs" />
          <Skeleton height="3xs" />
          <Skeleton height="3xs" />
        </>
      )}
    </Stack>
  );
};
