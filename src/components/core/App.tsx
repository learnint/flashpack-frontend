import React from "react";
import { Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "auth";
import { Navbar } from "./Navbar";
import { Account, CreateAccount, Login } from "components/pages";

export const App: React.FC = () => {
  return (
    <Flex w="100vw" h="100vh" direction="column">
      <Router>
        <Navbar />
        <Flex direction="column" flex="auto" overflow="auto">
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">Public</Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/createAccount">
              <CreateAccount />
            </Route>
            <PrivateRoute path="/account">
              <Account />
            </PrivateRoute>
            <PrivateRoute path="/protected">Protected</PrivateRoute>
          </Switch>
        </Flex>
      </Router>
    </Flex>
  );
};
