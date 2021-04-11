import React from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Pack as PackModel, Group } from "models";
import { Cards } from "./cards";
import { PackSettings } from "./settings";

interface PackProps {
  isAdmin: boolean;
  packs: PackModel[];
  group?: Group;
}

export const Pack: React.FC<PackProps> = ({ isAdmin, packs, group }) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { packId } = useParams<{ packId: string }>();

  const pack = packs.find((pack) => pack.id === packId);

  return (
    <>
      {isAdmin && pack ? (
        <Switch>
          <Route path={`${path}/cards`}>
            <Cards pack={pack}>
              <IconButton
                ml="2"
                mb="2"
                icon={<FaPlay />}
                aria-label="Play Pack"
                onClick={() => {}}
              />
              <Button
                ml="2"
                mb="2"
                onClick={() => history.push(`${url}/settings`)}
              >
                Settings
              </Button>
            </Cards>
          </Route>
          <Route path={`${path}/settings`}>
            <PackSettings />
          </Route>
          <Route path={path}>
            <Redirect to={`${url}/cards`} />
          </Route>
        </Switch>
      ) : (
        <Redirect to={group ? `/groups/${group.id}/packs` : `/packs`} />
      )}
    </>
  );
};
