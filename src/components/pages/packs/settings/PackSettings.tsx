import React, { useState } from "react";
import { Button, Heading, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { usePack } from "context";
import { ConfirmButton } from "components/common";
import { useColorScheme } from "theme";
import { Pack } from "models";
import { PackInfo } from "./PackInfo";

interface PackSettingsProps {
  pack: Pack;
}

export const PackSettings: React.FC<PackSettingsProps> = ({ pack }) => {
  const colorScheme = useColorScheme();
  const { deletePack } = usePack();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>{pack.name} - Settings</Heading>
      <PackInfo pack={pack} isEditingState={[isEditing, setIsEditing]} />
      {!isEditing ? (
        <>
          <Button onClick={() => setIsEditing(true)}>Edit Pack Info</Button>
          <Formik
            initialValues={{}}
            onSubmit={async () => await deletePack(pack.id)}
          >
            {({ isSubmitting }) => (
              <Form>
                <ConfirmButton
                  type="submit"
                  isLoading={isSubmitting}
                  popoverText="Are you sure you want to delete this pack? This action cannot be undone."
                  confirmText="Yes, Delete Pack"
                >
                  Delete Pack
                </ConfirmButton>
              </Form>
            )}
          </Formik>
        </>
      ) : null}
    </Stack>
  );
};
