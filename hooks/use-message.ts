"use client";

import { useEffect, useCallback } from "react";

// 定义消息类型
interface MessageData {
  type: string;
  data?: any;
}

interface MessageEvent {
  data: string | MessageData;
}

interface UseMessageProps {
  onSetLanguage?: (lang: string) => void;
}

export const useMessage = ({ onSetLanguage }: UseMessageProps) => {
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data: MessageData =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        const type = data.type?.toLowerCase();

        switch (type) {
          case "passtoai-setlanguage":
            onSetLanguage?.(data.data);
            break;
        }
      } catch (error) {
        console.error("Message parsing error:", error);
      }
    },
    [onSetLanguage]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  const postMessage = useCallback((type: string, data?: any) => {
    window.parent.postMessage(
      JSON.stringify({
        type: `passtoai-${type.toLowerCase()}`,
        data,
      }),
      "*"
    );
  }, []);

  return { postMessage };
};
