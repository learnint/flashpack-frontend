import { Pack, User } from "models";

export interface Group {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  users: User[];
  packs: Pack[];
}
