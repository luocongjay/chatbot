"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowSize } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { PlusIcon, VercelIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { memo, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ChatService from "@/services/chat";
import { useSessionId } from "@/hooks/use-sessionId";
import Image from "next/image";
import { useIsIframe } from "@/hooks/use-iframe";

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
  const sessionId = useSessionId();

  const isIframe = useIsIframe();
  const [isEnlarge, setIsEnlarge] = useState(false);

  const handleOperates = (type: string) => {
    if (window.parent !== window)
      window.parent.postMessage(
        JSON.stringify({ type: "passtoai-operates", data: type }),
        "*"
      );
    if (type === "mini" || type === "enlarge") {
      setIsEnlarge((val) => !val);
    }
  };

  return (
    <header className="flex sticky top-0 bg-primary py-1.5 items-center px-2 md:px-2 gap-2  h-[56px]">
      <div className="max-w-3xl m-auto flex w-full justify-between">
        <div className="px-2 text-white font-bold text-lg">AllTick</div>
        {isIframe && (
          <div className="max-w-3xl flex items-center px-2 md:px-0">
            {isEnlarge ? (
              <div
                onClick={() => handleOperates("mini")}
                className="flex items-center px-2 cursor-pointer hover:bg-primary/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M15.9912 3.125L11.2812 7.835C11.1674 7.95288 11.1044 8.11075 11.1058 8.27463C11.1073 8.4385 11.173 8.59526 11.2889 8.71114C11.4047 8.82702 11.5615 8.89275 11.7254 8.89417C11.8892 8.8956 12.0471 8.8326 12.165 8.71875L16.875 4.00875V6.25C16.875 6.41576 16.9408 6.57473 17.0581 6.69194C17.1753 6.80915 17.3342 6.875 17.5 6.875C17.6658 6.875 17.8247 6.80915 17.9419 6.69194C18.0592 6.57473 18.125 6.41576 18.125 6.25V2.5C18.1252 2.41786 18.1092 2.33647 18.0779 2.26053C18.0466 2.18459 18.0006 2.1156 17.9425 2.05751C17.8844 1.99942 17.8154 1.9534 17.7395 1.92207C17.6635 1.89075 17.5821 1.87476 17.5 1.875H13.75C13.5842 1.875 13.4253 1.94085 13.3081 2.05806C13.1908 2.17527 13.125 2.33424 13.125 2.5C13.125 2.66576 13.1908 2.82473 13.3081 2.94194C13.4253 3.05915 13.5842 3.125 13.75 3.125H15.9912ZM2.05813 17.9419C2 17.8839 1.9539 17.815 1.92248 17.7392C1.89105 17.6634 1.87492 17.5821 1.875 17.5V13.75C1.875 13.5842 1.94085 13.4253 2.05806 13.3081C2.17527 13.1908 2.33424 13.125 2.5 13.125C2.66576 13.125 2.82473 13.1908 2.94194 13.3081C3.05915 13.4253 3.125 13.5842 3.125 13.75V15.9913L7.835 11.2813C7.95288 11.1674 8.11075 11.1044 8.27463 11.1058C8.4385 11.1073 8.59526 11.173 8.71114 11.2889C8.82702 11.4047 8.89275 11.5615 8.89417 11.7254C8.8956 11.8892 8.8326 12.0471 8.71875 12.165L4.00875 16.875H6.25C6.41576 16.875 6.57473 16.9408 6.69194 17.0581C6.80915 17.1753 6.875 17.3342 6.875 17.5C6.875 17.6658 6.80915 17.8247 6.69194 17.9419C6.57473 18.0592 6.41576 18.125 6.25 18.125H2.5C2.41792 18.1251 2.33662 18.109 2.26079 18.0775C2.18496 18.0461 2.11609 18 2.05813 17.9419Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            ) : (
              <div
                onClick={() => handleOperates("enlarge")}
                className="flex items-center px-2 cursor-pointer hover:bg-primary/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M15.9912 3.125L11.2812 7.835C11.1674 7.95288 11.1044 8.11075 11.1058 8.27463C11.1073 8.4385 11.173 8.59526 11.2889 8.71114C11.4047 8.82702 11.5615 8.89275 11.7254 8.89417C11.8892 8.8956 12.0471 8.8326 12.165 8.71875L16.875 4.00875V6.25C16.875 6.41576 16.9408 6.57473 17.0581 6.69194C17.1753 6.80915 17.3342 6.875 17.5 6.875C17.6658 6.875 17.8247 6.80915 17.9419 6.69194C18.0592 6.57473 18.125 6.41576 18.125 6.25V2.5C18.1252 2.41786 18.1092 2.33647 18.0779 2.26053C18.0466 2.18459 18.0006 2.1156 17.9425 2.05751C17.8844 1.99942 17.8154 1.9534 17.7395 1.92207C17.6635 1.89075 17.5821 1.87476 17.5 1.875H13.75C13.5842 1.875 13.4253 1.94085 13.3081 2.05806C13.1908 2.17527 13.125 2.33424 13.125 2.5C13.125 2.66576 13.1908 2.82473 13.3081 2.94194C13.4253 3.05915 13.5842 3.125 13.75 3.125H15.9912ZM2.05813 17.9419C2 17.8839 1.9539 17.815 1.92248 17.7392C1.89105 17.6634 1.87492 17.5821 1.875 17.5V13.75C1.875 13.5842 1.94085 13.4253 2.05806 13.3081C2.17527 13.1908 2.33424 13.125 2.5 13.125C2.66576 13.125 2.82473 13.1908 2.94194 13.3081C3.05915 13.4253 3.125 13.5842 3.125 13.75V15.9913L7.835 11.2813C7.95288 11.1674 8.11075 11.1044 8.27463 11.1058C8.4385 11.1073 8.59526 11.173 8.71114 11.2889C8.82702 11.4047 8.89275 11.5615 8.89417 11.7254C8.8956 11.8892 8.8326 12.0471 8.71875 12.165L4.00875 16.875H6.25C6.41576 16.875 6.57473 16.9408 6.69194 17.0581C6.80915 17.1753 6.875 17.3342 6.875 17.5C6.875 17.6658 6.80915 17.8247 6.69194 17.9419C6.57473 18.0592 6.41576 18.125 6.25 18.125H2.5C2.41792 18.1251 2.33662 18.109 2.26079 18.0775C2.18496 18.0461 2.11609 18 2.05813 17.9419Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            )}
            <div
              onClick={() => handleOperates("close")}
              className="flex items-center px-2 cursor-pointer hover:bg-primary/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M3.16291 7.67502C3.00971 7.52388 2.92092 7.31934 2.91513 7.10422C2.90933 6.88909 2.98698 6.68007 3.13183 6.52091C3.27667 6.36174 3.47746 6.26478 3.69218 6.25033C3.9069 6.23587 4.11888 6.30504 4.28375 6.44335L4.33708 6.49169L10.045 12.155L15.6583 6.49668C15.8052 6.34866 16.0022 6.26107 16.2105 6.2512C16.4187 6.24133 16.6231 6.30989 16.7833 6.44335L16.8371 6.49168C16.985 6.63859 17.0726 6.83562 17.0824 7.04389C17.0921 7.25216 17.0235 7.45654 16.89 7.61668L16.8417 7.67043L10.6417 13.9204C10.4948 14.0684 10.2977 14.1559 10.0895 14.1657C9.88119 14.1755 9.67681 14.1069 9.51666 13.9734L9.46291 13.925L3.16291 7.67502Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </div>
        )}
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
