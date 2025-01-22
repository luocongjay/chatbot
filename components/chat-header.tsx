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
import Image from "next/image";

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
    <header className="flex sticky top-0 bg-[#35254F] py-1.5 items-center px-2 md:px-2 gap-2  h-[56px]">
      <div className="w-full mx-auto max-w-3xl px-2 text-white font-bold text-lg">
        AllTick
      </div>
      {/* {(!open || windowWidth < 768 || 1 === 1) && (
        <div className="w-full mx-auto max-w-3xl flex justify-between items-center px-2 md:px-0">
          <Link
            className="font-medium underline underline-offset-4"
            href="https://alltick.co"
            target="_blank"
          >
            <Image alt="logo" src="/images/logo.png" width={102} height={20} />
          </Link>
          <Button
            variant="outline"
            className="order-2 md:order-1 md:h-fit ml-auto md:ml-0"
            onClick={async () => {
              await ChatService.resetEmbedChatSession(chatId, sessionId);
              setMessages([]);
              router.refresh();
            }}
          >
            <PlusIcon />
            <span>New Chat</span>
          </Button>
        </div>
      )} */}
    </header>
  );
}
