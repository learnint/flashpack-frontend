import React from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Redirect, Switch, useLocation } from "react-router-dom";
import { UserProvider, GroupProvider, PackProvider } from "context";
import { AnonymousRoute, AuthorizedRoute } from "router";
import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";
import {
  Account,
  CreateAccount,
  Login,
  Groups,
  Packs,
  Quiz,
} from "components/pages";

export const App: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const location = useLocation();
  const isAnonRoute = ["/login", "/createAccount"].includes(location.pathname);
  const isQuizRoute = location.pathname.startsWith("/quiz");

  return (
    <Flex w="100vw" h="100vh" direction="column">
      <Navbar
        isQuizRoute={isQuizRoute}
        isAnonRoute={isAnonRoute}
        isMobile={isMobile}
      />
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
            <PackProvider>
              <Packs />
            </PackProvider>
          </AuthorizedRoute>
          <AuthorizedRoute path="/groups">
            <GroupProvider>
              <Groups />
            </GroupProvider>
          </AuthorizedRoute>
          <AuthorizedRoute path="/quiz/:packId">
            <Quiz />
          </AuthorizedRoute>
          <AuthorizedRoute exact path="/">
            Home
          </AuthorizedRoute>
          <AuthorizedRoute path="*">
            <Redirect to="/" />
          </AuthorizedRoute>
        </Switch>
      </Flex>
      {!isQuizRoute && !isAnonRoute && isMobile ? <MobileNav /> : null}
      <ReactQueryDevtools initialIsOpen={false} />
    </Flex>
  );
};
