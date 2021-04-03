import React, { useState } from "react";
import {
  Heading,
  Button,
  Stack,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { useGroup } from "context";
import { Group } from "models";
import { useColorScheme } from "theme";
import { GroupInfo } from "./GroupInfo";

interface GroupSettingsProps {
  group: Group;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  const { deleteGroup } = useGroup();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <Formik
            initialValues={{}}
            onSubmit={async () => {
              const success = await deleteGroup(group.id);
              if (success) {
                history.push("/groups");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Popover isOpen={isOpen}>
                  <PopoverTrigger>
                    <Button
                      onClick={() => setIsOpen(true)}
                      isLoading={isSubmitting}
                      w="full"
                      colorScheme="red"
                    >
                      Delete Group
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton onClick={() => setIsOpen(false)} />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to delete this group? This action
                      cannot be undone.
                    </PopoverBody>
                    <PopoverFooter d="flex" justifyContent="flex-end">
                      <ButtonGroup size="sm">
                        <Button
                          onClick={() => setIsOpen(false)}
                          isDisabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          isLoading={isSubmitting}
                          colorScheme="red"
                        >
                          Yes, Delete Group
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Form>
            )}
          </Formik>
        </>
      ) : null}
    </Stack>
  );
};
