import { useEffect, useState } from "react";

export default function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState<"online" | "offline">(
    navigator.onLine ? "online" : "offline",
  );

  useEffect(() => {
    setOnlineStatus(navigator.onLine ? "online" : "offline");
  }, []);

  return { onlineStatus };
}
