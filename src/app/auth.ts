import {
  getAuth,
  signInAnonymously,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebaseConfig from "@/firebaseConfig.json";
import { getApps, initializeApp as initializeAppClient } from "firebase/app";

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

export async function signOut() {
  await getAuth().signOut();
}

export const initClient = () =>
  getApps().length || initializeAppClient(firebaseConfig);
