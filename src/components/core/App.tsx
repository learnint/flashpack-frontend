import React from "react";
import { Flex } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Switch } from "react-router-dom";
import { UserProvider, GroupProvider } from "context";
import { AnonymousRoute, AuthorizedRoute } from "router";
import { Navbar } from "./Navbar";
import { Account, CreateAccount, Login, Groups, Packs } from "components/pages";

export const App: React.FC = () => {
  return (
    <Flex w="100vw" h="100vh" direction="column">
      <Navbar />
      <Flex
        px="4"
        py="2"
        direction="column"
        align="center"
        flex="auto"
        overflow="auto"
      >
        <Switch>
          <AnonymousRoute path="/login">
            <Login />
          </AnonymousRoute>
          <AnonymousRoute path="/createAccount">
            <CreateAccount />
          </AnonymousRoute>
          <AuthorizedRoute path="/account">
            <UserProvider>
              <Account />
            </UserProvider>
          </AuthorizedRoute>
          <AuthorizedRoute path="/packs">
            <Packs />
          </AuthorizedRoute>
          <AuthorizedRoute path="/groups">
            <GroupProvider>
              <Groups />
            </GroupProvider>
          </AuthorizedRoute>
          <AuthorizedRoute path="/">Home</AuthorizedRoute>
        </Switch>
      </Flex>
      <ReactQueryDevtools initialIsOpen={false} />
    </Flex>
  );
};
