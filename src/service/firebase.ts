import { getFirebaseAdmin } from "next-firebase-auth";

export const admin = getFirebaseAdmin();
export const db = admin.firestore();
export const auth = admin.auth();
