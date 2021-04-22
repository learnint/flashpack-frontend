import React, { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState<number>(0);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const location = useLocation();
  const isAnonRoute = ["/login", "/createAccount"].includes(location.pathname);
  const isQuizRoute = location.pathname.startsWith("/quiz");

  useEffect(() => {
    if (!isQuizRoute) {
      setProgress(0);
    }
  }, [isQuizRoute]);

  return (
    <Flex w="100vw" h="100vh" direction="column">
      <Navbar
        isQuizRoute={isQuizRoute}
        isAnonRoute={isAnonRoute}
        isMobile={isMobile}
        progress={progress}
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
            <Quiz setProgress={setProgress} />
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
