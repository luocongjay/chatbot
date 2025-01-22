"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { generateUUID as v4 } from "@/lib/utils";

const SessionIdContext = createContext("");

export function SessionIdProvider({ children }: any) {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const newId = v4();
    setSessionId(newId);
  }, []);

  return (
    <SessionIdContext.Provider value={sessionId}>
      {children}
    </SessionIdContext.Provider>
  );
}

export function useSessionId() {
  return useContext(SessionIdContext);
}
