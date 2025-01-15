"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowSize } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { PlusIcon, VercelIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { memo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ChatService from "@/services/chat";
import { useSessionId } from "@/hooks/use-sessionId";

export function ChatHeader({
  chatId,
  setMessages,
}: {
  chatId: string;
  isReadonly: boolean;
  setMessages: any;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const sessionId = useSessionId({ embedId: chatId });

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={async () => {
                await ChatService.resetEmbedChatSession(chatId, sessionId);
                setMessages([]);
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}
    </header>
  );
}
