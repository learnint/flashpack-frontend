import React, { createContext, useContext } from "react";
import { useQueryPacks } from "api";
import { useToast } from "components/common";
import { Pack } from "models";
import { useMutator } from "./config";

interface PackContext {
  packs: Pack[] | undefined;
  isPacksLoading: boolean;
  isPacksError: boolean;
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

  const { data, isLoading, isError } = useQueryPacks(groupId, {
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
  });

  return {
    packs: data,
    isPacksLoading: isLoading,
    isPacksError: isError,
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
