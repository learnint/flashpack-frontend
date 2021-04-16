import React from "react";
import { Button, Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useColorScheme } from "theme";
import { Pack } from "models";
import { useCard } from "context";
import { BlockLink } from "components/common";
import { CreateCard } from "./create";
import { Card } from "./Card";
import { convertCardType } from "./convertCardType";

interface CardsProps {
  pack: Pack;
}

export const Cards: React.FC<CardsProps> = ({ children, pack }) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();

  const { cards, isCardsLoading, isCardsError } = useCard();

  if (!isCardsLoading && !isCardsError && cards) {
    return (
      <Switch>
        <Route path={`${path}/create`}>
          <CreateCard pack={pack} />
        </Route>
        <Route path={`${path}/:cardId`}>
          <Card cards={cards} />
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
            {cards?.map(({ id, type, question }) => (
              <BlockLink
                to={`${url}/${id}`}
                name={convertCardType(type)}
                description={question}
                key={id}
              />
            ))}
          </Stack>
        </Route>
      </Switch>
    );
  }
  return (
    <Stack w="full" maxW="container.lg">
      <Skeleton height="50px" />
      <Skeleton height="3xs" />
      <Skeleton height="3xs" />
      <Skeleton height="3xs" />
    </Stack>
  );
};
