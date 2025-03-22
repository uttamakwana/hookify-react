import { useState } from "react";
import { useEventListener } from "./useEventListener.ts";

type TOnlineStatus = "online" | "offline";
type TUseOnlineStatusReturn = {
  onlineStatus: TOnlineStatus;
};

/**
 * A custom hook that tracks the online/offline status of the user's network connection.
 *
 * @returns {Object} An object containing:
 * - `onlineStatus`: Indicating whether the user is "online" or "offline".
 *
 * @example
 * import { useOnlineStatus } from "hookify-react";
 *
 * export default function UseOnlineStatus() {
 *  const { onlineStatus } = useOnlineStatus();
 *
 *  return <div>{onlineStatus === "online" ? "You are online😁" ? "You are offline😥"}</div>
 * }
 */
export function useOnlineStatus(): TUseOnlineStatusReturn {
  const [onlineStatus, setOnlineStatus] = useState<TOnlineStatus>(
    navigator.onLine ? "online" : "offline",
  );

  const updateStatus = () => {
    setOnlineStatus(navigator.onLine ? "online" : "offline");
  };

  useEventListener("online", updateStatus, { current: window });
  return { onlineStatus };
}
