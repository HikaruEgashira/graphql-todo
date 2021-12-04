import firebaseConfig from "@/firebaseConfig.json";
import { init } from "next-firebase-auth";

export const initAuth = () => {
  init({
    authPageURL: "/",
    appPageURL: "/dashboard",
    // debug: process.env.NODE_ENV === "development",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.FIREBASE_PROJECT_ID ?? "",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? "",
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : "",
      },
      databaseURL: "",
    },
    firebaseClientInitConfig: firebaseConfig,
    cookies: {
      name: firebaseConfig.projectId,
      keys:
        process.env.COOKIE_SECRET_CURRENT && process.env.COOKIE_SECRET_PREVIOUS
          ? [
              process.env.COOKIE_SECRET_CURRENT,
              process.env.COOKIE_SECRET_PREVIOUS,
            ]
          : undefined,
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === "false",
      signed: true,
    },
  });
};
