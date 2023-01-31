import {authentication, firebaseConfig } from "../../firebase-config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Router from "next/router";
import { useAuth } from "./useAuth";
import { LoginStatus, NotificationKeys } from "@/services/localKey";
import { useNotification } from "./useNotification";

export const useLogin = () => {
  const { addNotification } = useNotification();
  const { authContext, setAuth, removeAuth } = useAuth();

  const auth = getAuth(firebaseConfig);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authentication, provider).then((res) => {
      if (res) {
        //@ts-ignore
        setAuth(res);
        console.log(res)
        Router.push("/main");
      } else {
        addNotification("Error", NotificationKeys.ERROR);
      }
    });
  };

  const checkingLogin = (status: string) => {
    if (
      authContext.user &&
      !authContext.user.uid &&
      status === LoginStatus.OTHER
    ) {
      Router.push("/login");
    } else if (
      authContext.user &&
      authContext.user.uid &&
      status === LoginStatus.LOGIN
    ) {
      Router.push("/main");
    }
  };

  const signOutGoogle = () => {
    signOut(auth);
    removeAuth();
  };

  return {
    signIn,
    signOutGoogle,
    checkingLogin,
  };
};
