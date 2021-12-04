import { getAuth, signInAnonymously, UserCredential } from "firebase/auth";

export async function loginAnonymously(): Promise<UserCredential> {
  const auth = getAuth();
  return await signInAnonymously(auth);
}
