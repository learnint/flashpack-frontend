import React from "react";
import {
  Stack,
  Heading,
  Flex,
  Button,
  Skeleton,
  Text,
  Box,
} from "@chakra-ui/react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { BlockLink, ConfirmButton } from "components/common";
import { useGroup } from "context";
import { useColorScheme } from "theme";
import { CreateGroup } from "./create";
import { Group } from "./Group";
import { Form, Formik } from "formik";

export const Groups: React.FC = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  const {
    groups,
    isGroupsLoading,
    isGroupsError,
    joinGroup,
    leaveGroup,
  } = useGroup();

  return (
    <>
      {!isGroupsLoading && !isGroupsError && groups ? (
        <Switch>
          <Route path={`${path}/create`}>
            <CreateGroup />
          </Route>
          <Route path={`${path}/:groupId`}>
            <Group groups={groups} />
          </Route>
          <Route path={path}>
            <Stack w="full" maxW="container.lg">
              <Flex justifyContent="space-between">
                <Heading color={colorScheme}>Groups</Heading>
                <Button onClick={() => history.push(`${url}/create`)}>
                  Create Group
                </Button>
              </Flex>
              {groups
                .filter((group) => group.isJoined)
                .map(({ id, name, description, isAdmin, packCount, users }) => (
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
                      { key: "Packs", value: packCount },
                      {
                        key: "Members",
                        value: users.filter((user) => user.isJoined).length,
                      },
                    ]}
                    key={id}
                  />
                ))}
              <Heading size="md">Group Invites</Heading>
              {groups
                .filter((group) => !group.isJoined)
                .map(({ id, name, description }) => (
                  <Flex
                    as="article"
                    justifyContent="space-between"
                    p="5"
                    borderWidth="thin"
                    rounded="lg"
                    key={id}
                  >
                    <Box>
                      <Heading size="lg" color={colorScheme}>
                        {name}
                      </Heading>
                      <Text wordBreak="break-word">{description}</Text>
                    </Box>
                    <Flex alignItems="center">
                      <Formik
                        initialValues={{}}
                        onSubmit={async () => await joinGroup(id)}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <Button
                              type="submit"
                              isLoading={isSubmitting}
                              mr="2"
                            >
                              Accept
                            </Button>
                          </Form>
                        )}
                      </Formik>
                      <Formik
                        initialValues={{}}
                        onSubmit={async () => await leaveGroup(id)}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <ConfirmButton
                              type="submit"
                              isLoading={isSubmitting}
                              popoverText="Are you sure you want to decline this invite? This action cannot be undone."
                              confirmText="Yes, Decline Invite"
                            >
                              Decline
                            </ConfirmButton>
                          </Form>
                        )}
                      </Formik>
                    </Flex>
                  </Flex>
                ))}
            </Stack>
          </Route>
        </Switch>
      ) : (
        <Stack w="full" maxW="container.lg">
          <Skeleton height="50px" />
          <Skeleton height="3xs" />
          <Skeleton height="3xs" />
          <Skeleton height="3xs" />
        </Stack>
      )}
    </>
  );
};
