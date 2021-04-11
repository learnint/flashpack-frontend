import React, { createContext, useContext } from "react";
import {
  PostPackRequest,
  PutPackRequest,
  useMutateCreatePack,
  useMutateDeletePack,
  useMutateUpdatePack,
  useQueryPacks,
} from "api";
import { useToast } from "components/common";
import { Pack } from "models";
import { useMutator } from "./config";

interface PackContext {
  packs: Pack[] | undefined;
  isPacksLoading: boolean;
  isPacksError: boolean;
  createPack: (request: PostPackRequest) => Promise<boolean>;
  updatePack: (request: PutPackRequest) => Promise<boolean>;
  deletePack: (request: string) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const PackContext = createContext<PackContext | undefined>(undefined);

export const usePack = () => {
  const context = useContext(PackContext);

  if (context === undefined) {
    throw new Error("usePack must be used within a PackProvider");
  }

  return context;
};

const usePackProvider = (groupId: string | undefined) => {
  const { toast } = useToast();

  const mutator = useMutator();

  const mutateCreatePack = useMutateCreatePack();
  const mutateUpdatePack = useMutateUpdatePack();
  const mutateDeletePack = useMutateDeletePack();

  const { data, isLoading, isError } = useQueryPacks(groupId, {
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
  });

  const createPack = async (request: PostPackRequest) =>
    mutator(mutateCreatePack, request, "Pack created!");

  const updatePack = (request: PutPackRequest) =>
    mutator(mutateUpdatePack, request, "Pack info updated!");

  const deletePack = (request: string) =>
    mutator(mutateDeletePack, request, "Pack deleted!");

  return {
    packs: data,
    isPacksLoading: isLoading,
    isPacksError: isError,
    createPack,
    updatePack,
    deletePack,
  };
};

interface PackProviderProps {
  groupId?: string;
}

export const PackProvider: React.FC<PackProviderProps> = ({
  children,
  groupId,
}) => {
  return (
    <PackContext.Provider value={usePackProvider(groupId)}>
      {children}
    </PackContext.Provider>
  );
};
