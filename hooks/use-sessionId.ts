import { useEffect, useState } from "react";
import { generateUUID as v4 } from "@/lib/utils";

export function useSessionId({ embedId = "" }) {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    function getOrAssignSessionId() {
      if (!window || !embedId) return;

      const STORAGE_IDENTIFIER = `allm_${embedId}_session_id`;
      const currentId = window.localStorage.getItem(STORAGE_IDENTIFIER);
      if (!!currentId) {
        console.log(`Resuming session id`, currentId);
        setSessionId(currentId);
        return;
      }

      const newId = v4();
      console.log(`Registering new session id`, newId);
      window.localStorage.setItem(STORAGE_IDENTIFIER, newId);
      setSessionId(newId);
    }
    getOrAssignSessionId();
  }, [embedId]);

  return sessionId;
}
