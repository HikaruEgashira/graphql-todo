import {
  getAuth,
  signInAnonymously,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export type Provider = "google" | "anonymous";

export async function login(providerName: Provider): Promise<UserCredential> {
  const auth = getAuth();
  switch (providerName) {
    case "google":
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    case "anonymous":
      return signInAnonymously(auth);
  }
}
