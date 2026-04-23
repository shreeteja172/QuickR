import { headers } from "next/headers";
import { auth } from "./auth";

export const currentSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};