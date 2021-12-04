import { AuthUser } from "next-firebase-auth";

export type Context = {
  token: string;
  user: AuthUser | null;
};
