"use client";

import { Suspense } from "react";
import { Chat } from "@/components/chat";
import { useSearchParams } from "next/navigation";

export default function Page() {
  return (
    <Suspense>
      <PageContainer />
    </Suspense>
  );
}

function PageContainer() {
  const params = useSearchParams();
  const id = params.get("id") as string;
  return id ? <Chat id={id} initialMessages={[]} isReadonly={false} /> : null;
}
