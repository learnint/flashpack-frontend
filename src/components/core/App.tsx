import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { PrivateRoute } from "auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <Stack w="100vw" h="100vh">
      <Navbar />
      <Stack flex="auto" overflow="auto">
        <Button colorScheme="purple">Test Button</Button>
        <Router>
          <Switch>
            <Route path="/public">Public</Route>
            <Route path="/login">Login</Route>
            <PrivateRoute path="/protected">Protected</PrivateRoute>
          </Switch>
        </Router>
      </Stack>
    </Stack>
  );
};
