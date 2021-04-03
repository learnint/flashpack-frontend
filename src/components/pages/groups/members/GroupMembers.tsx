import React from "react";
import { Group } from "models";

interface GroupMembersProps {
  group: Group;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ group }) => {
  return (
    <div>
      {group.users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
};
