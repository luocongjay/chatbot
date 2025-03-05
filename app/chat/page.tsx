"use client";

import { Suspense } from "react";
import { Chat } from "@/components/chat";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const id = params.get("id") as string;
  return (
    <Suspense>
      {id && <Chat id={id} initialMessages={[]} isReadonly={false} />}
    </Suspense>
  );
}
