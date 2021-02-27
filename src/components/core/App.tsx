import React from "react";
import { Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { AnonymousRoute, AuthorizedRoute } from "auth";
import { Navbar } from "./Navbar";
import { Account, CreateAccount, Login } from "components/pages";

export const App: React.FC = () => {
  return (
    <Flex w="100vw" h="100vh" direction="column">
      <Router>
        <Navbar />
        <Flex direction="column" flex="auto" overflow="auto">
          ------------- for testing -------------
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/createAccount">Create Account</Link>
            </li>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          -----------------------------------------
          <br />
          <Switch>
            <AnonymousRoute path="/login">
              <Login />
            </AnonymousRoute>
            <AnonymousRoute path="/createAccount">
              <CreateAccount />
            </AnonymousRoute>
            <AuthorizedRoute path="/account">
              <Account />
            </AuthorizedRoute>
            <AuthorizedRoute path="/protected">Protected</AuthorizedRoute>
            <Route path="/public">Public</Route>
            <Route path="/">Root</Route>
          </Switch>
        </Flex>
      </Router>
    </Flex>
  );
};
