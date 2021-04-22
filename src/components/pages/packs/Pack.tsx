import React from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { CardProvider } from "context";
import { Pack as PackModel } from "models";
import { Cards } from "./cards";
import { PackSettings } from "./settings";
import { onePathBack } from "router";

interface PackProps {
  isAdmin: boolean;
  packs: PackModel[];
}

export const Pack: React.FC<PackProps> = ({ isAdmin, packs }) => {
  const location = useLocation();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { packId } = useParams<{ packId: string }>();

  const pack = packs.find((pack) => pack.id === packId);

  return (
    <>
      {isAdmin && pack ? (
        <Switch>
          <Route path={`${path}/cards`}>
            <CardProvider packId={pack.id}>
              <Cards pack={pack}>
                <IconButton
                  ml="2"
                  mb="2"
                  icon={<FaPlay />}
                  aria-label="Play Pack"
                  onClick={() =>
                    history.push(`/quiz/${pack.id}`, { from: location })
                  }
                  isDisabled={pack.cardCount < 1}
                />
                <Button
                  ml="2"
                  mb="2"
                  onClick={() => history.push(`${url}/settings`)}
                >
                  Settings
                </Button>
              </Cards>
            </CardProvider>
          </Route>
          <Route path={`${path}/settings`}>
            <PackSettings pack={pack} />
          </Route>
          <Route path={path}>
            <Redirect to={`${url}/cards`} />
          </Route>
        </Switch>
      ) : (
        <Redirect to={onePathBack(url)} />
      )}
    </>
  );
};
