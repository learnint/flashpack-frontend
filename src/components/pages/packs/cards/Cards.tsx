import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useColorScheme } from "theme";
import { Pack } from "models";
import { CreateCard } from "./create";
import { Card } from "./Card";

interface CardsProps {
  pack: Pack;
}

export const Cards: React.FC<CardsProps> = ({ children, pack }) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  return (
    <Switch>
      <Route path={`${path}/create`}>
        <CreateCard pack={pack} groupId="" />
      </Route>
      <Route path={`${path}/:cardId`}>
        <Card />
      </Route>
      <Route path={path}>
        <Stack w="full" maxW="container.lg">
          <Flex justifyContent="space-between">
            <Heading color={colorScheme}>{pack.name} - Cards</Heading>
            <Flex justifyContent="flex-end" wrap="wrap">
              {children}
              <Button ml="2" onClick={() => history.push(`${url}/create`)}>
                Create Card
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Route>
    </Switch>
  );
};
