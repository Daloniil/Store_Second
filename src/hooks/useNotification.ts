import { NotificationContext } from "@/providers/NotificationProvider";
import { useContext } from "react";

export const useNotification = () => {
  const {
    notification,
    statusNotification,
    addNotification,
    removeNotification,
  } = useContext(NotificationContext);

  return {
    notification,
    statusNotification,
    addNotification,
    removeNotification,
  };
};
