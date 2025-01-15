import { Chat } from "@/components/chat";
import ChatService from "@/services/chat";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  return (
    <>
      <Chat id={id} key={id} initialMessages={[]} isReadonly={false} />
    </>
  );
}
