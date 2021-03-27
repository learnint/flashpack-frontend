import { Pack, User } from "models";

export interface Group {
  id: string;
  name: string;
  description?: string;
  isAdmin: boolean;
  tags: string[];
  users: User[];
  packs: Pack[];
}
