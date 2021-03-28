import { User } from "models";

export interface Group {
  id: string;
  name: string;
  description?: string;
  isJoined: boolean;
  isAdmin: boolean;
  tags: string[];
  users: User[];
}
