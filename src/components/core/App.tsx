import React from "react";
import { Stack } from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "auth";
import { Navbar } from "./Navbar";
import { Login } from "components/pages/login";

export const App: React.FC = () => {
  return (
    <Stack w="100vw" h="100vh">
      <Router>
        <Navbar />
        <Stack flex="auto" overflow="auto">
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
            <PrivateRoute path="/protected">Protected</PrivateRoute>
          </Switch>
        </Stack>
      </Router>
    </Stack>
  );
};
