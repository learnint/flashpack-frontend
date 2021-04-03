import React, { useState } from "react";
import { Heading, Button, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Group } from "models";
import { useColorScheme } from "theme";
import { GroupInfo } from "./GroupInfo";

interface GroupSettingsProps {
  group: Group;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>Group Settings</Heading>
      <GroupInfo group={group} isEditingState={[isEditing, setIsEditing]} />
      {!isEditing ? (
        <>
          <Button onClick={() => setIsEditing(true)}>Edit Group Info</Button>
          <Button onClick={() => history.push(`/groups/${group.id}/members`)}>
            Group Members
          </Button>
          <Button colorScheme="red">Delete Group</Button>
        </>
      ) : null}
    </Stack>
  );
};
