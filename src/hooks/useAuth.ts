import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const { authContext, setAuth, removeAuth } = useContext(AuthContext);

  return {
    authContext,
    setAuth,
    removeAuth,
  };
};
