import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;

type GoogleIdTokenPayload = {
  token: string;
  accessToken?: string;
};

export async function signInWithGoogle(callbackURL?: string) {
  return authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
}

export async function signInWithGoogleIdToken(idToken: GoogleIdTokenPayload) {
  return authClient.signIn.social({
    provider: "google",
    idToken,
  });
}
