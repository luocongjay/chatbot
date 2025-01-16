"use client";

import type { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useCallback, useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { ChatHeader } from "@/components/chat-header";
import { fetcher, generateUUID as v4 } from "@/lib/utils";

import { Block } from "./block";
import { MultimodalInput } from "./multimodal-input";
import { Messages } from "./messages";
import { useBlockSelector } from "@/hooks/use-block";
import { useSessionId } from "@/hooks/use-sessionId";
import ChatService from "@/services/chat";
import handleChat from "@/lib/chat";
import { useRouter } from "next/navigation";

export function Chat({
  id,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  isReadonly: boolean;
}) {
  const sessionId = useSessionId({ embedId: id });
  const router = useRouter();

  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchChatHistory() {
      if (!sessionId || !id) return;
      try {
        const formattedMessages = await ChatService.embedSessionHistory(
          id,
          sessionId
        );
        setMessages(
          formattedMessages.map((item: any) => {
            return { ...item, id: v4() };
          })
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical chats:", error);
        setLoading(false);
      }
    }
    setLoading(true);
    fetchChatHistory();
  }, [sessionId, id]);

  const append = useCallback(
    (message: any) => {
      const latestMessage = [
        ...messages,
        {
          ...message,
          id: v4(),
        },
      ];
      setMessages(latestMessage);
      setLoading(true);
    },
    [messages]
  );

  useEffect(() => {
    async function fetchReply() {
      const promptMessage =
        messages.length > 0 ? messages[messages.length - 1] : null;
      const remHistory = messages.length > 0 ? [...messages] : [];
      var _chatHistory = [...remHistory];
      console.log("promptMessage", promptMessage);
      if (
        !promptMessage ||
        promptMessage?.closed === true ||
        isLoading == false ||
        promptMessage?.role === "assistant"
      ) {
        console.log("stop");
        setLoading(false);
        return false;
      }

      await ChatService.streamChat(
        sessionId,
        {
          embedId: id,
        },
        promptMessage.content,
        (chatResult: any) =>
          handleChat(
            chatResult,
            setLoading,
            setMessages,
            remHistory,
            _chatHistory
          )
      );
      return;
    }
    isLoading === true && fetchReply();
  }, [isLoading, messages, id, sessionId]);

  const reload = useCallback(() => {
    setLoading(true);
  }, []);

  function handleSubmit() {
    append({
      role: "user",
      content: input,
    });
    setInput("");
  }
  const stop = () => {
    setLoading(false);
    ChatService.stop();
  };

  const votes: any[] = [];

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  return sessionId ? (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          isReadonly={isReadonly}
          setMessages={setMessages}
        />

        <Messages
          chatId={id}
          isLoading={isLoading}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          // @ts-ignore
          reload={reload}
          isReadonly={isReadonly}
          isBlockVisible={isBlockVisible}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              // @ts-ignore
              append={append}
            />
          )}
        </form>
      </div>

      <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        // @ts-ignore
        append={append}
        messages={messages}
        setMessages={setMessages}
        // @ts-ignore
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  ) : null;
}
