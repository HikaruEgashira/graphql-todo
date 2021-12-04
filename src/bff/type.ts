import { AuthUser } from "next-firebase-auth";

export type Context = {
  user: AuthUser;
} | null;
