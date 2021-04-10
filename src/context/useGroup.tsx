import React, { createContext, useContext } from "react";
import {
  PostGroupRequest,
  PostGroupUsersRequest,
  PutGroupRequest,
  useMutateCreateGroup,
  useMutateDeleteGroup,
  useMutateInviteGroupUsers,
  useMutateJoinGroup,
  useMutateLeaveGroup,
  useMutateUpdateGroup,
  useQueryGroups,
} from "api";
import { useToast } from "components/common";
import { Group } from "models";
import { useMutator } from "./config";

interface GroupContext {
  groups: Group[] | undefined;
  isGroupsLoading: boolean;
  isGroupsError: boolean;
  createGroup: (request: PostGroupRequest) => Promise<boolean>;
  updateGroup: (request: PutGroupRequest) => Promise<boolean>;
  deleteGroup: (request: string) => Promise<boolean>;
  inviteGroupUsers: (request: PostGroupUsersRequest) => Promise<boolean>;
  joinGroup: (request: string) => Promise<boolean>;
  leaveGroup: (request: string) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const GroupContext = createContext<GroupContext | undefined>(undefined);

export const useGroup = () => {
  const context = useContext(GroupContext);

  if (context === undefined) {
    throw new Error("useGroup must be used within a GroupProvider");
  }

  return context;
};

const useGroupProvider = () => {
  const { toast } = useToast();

  const mutator = useMutator();

  const mutateCreateGroup = useMutateCreateGroup();
  const mutateUpdateGroup = useMutateUpdateGroup();
  const mutateDeleteGroup = useMutateDeleteGroup();
  const mutateInviteGroupUsers = useMutateInviteGroupUsers();
  const mutateJoinGroup = useMutateJoinGroup();
  const mutateLeaveGroup = useMutateLeaveGroup();

  const { data, isLoading, isError } = useQueryGroups({
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
  });

  const createGroup = async (request: PostGroupRequest) =>
    mutator(mutateCreateGroup, request, "Group created!");

  const updateGroup = (request: PutGroupRequest) =>
    mutator(mutateUpdateGroup, request, "Group info updated!");

  const deleteGroup = (request: string) =>
    mutator(mutateDeleteGroup, request, "Group deleted!");

  const inviteGroupUsers = (request: PostGroupUsersRequest) =>
    mutator(
      mutateInviteGroupUsers,
      request,
      "All valid emails associated with a user have been invited to the group!"
    );

  const joinGroup = (request: string) =>
    mutator(mutateJoinGroup, request, "Joined group!");

  const leaveGroup = (request: string) =>
    mutator(mutateLeaveGroup, request, "Left group!");

  return {
    groups: data,
    isGroupsLoading: isLoading,
    isGroupsError: isError,
    createGroup,
    updateGroup,
    deleteGroup,
    inviteGroupUsers,
    joinGroup,
    leaveGroup,
  };
};

export const GroupProvider: React.FC = ({ children }) => {
  return (
    <GroupContext.Provider value={useGroupProvider()}>
      {children}
    </GroupContext.Provider>
  );
};
