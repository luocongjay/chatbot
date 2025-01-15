// For handling of synchronous chats that are not utilizing streaming or chat requests.
export default function handleChat(
  chatResult: any,
  setLoadingResponse: any,
  setChatHistory: any,
  remHistory: any,
  _chatHistory: any
) {
  // console.log('chatResult', chatResult, arguments)
  const {
    uuid,
    textResponse,
    type,
    sources = [],
    error,
    close,
    errorMsg = null,
  } = chatResult;

  // Preserve the sentAt from the last message in the chat history
  const lastMessage = _chatHistory[_chatHistory.length - 1];
  const sentAt = lastMessage?.sentAt;

  if (type === "abort") {
    setLoadingResponse(false);
    setChatHistory([
      ...remHistory,
      {
        id: uuid,
        content: textResponse,
        role: "assistant",
        sources,
        closed: true,
        error,
        errorMsg,
        animate: false,
        pending: false,
        sentAt,
      },
    ]);
    _chatHistory.push({
      id: uuid,
      content: textResponse,
      role: "assistant",
      sources,
      closed: true,
      error,
      errorMsg,
      animate: false,
      pending: false,
      sentAt,
    });
  } else if (type === "textResponse") {
    setLoadingResponse(false);
    setChatHistory([
      ...remHistory,
      {
        id: uuid,
        content: textResponse,
        role: "assistant",
        sources,
        closed: close,
        error,
        errorMsg,
        animate: !close,
        pending: false,
        sentAt,
      },
    ]);
    _chatHistory.push({
      id: uuid,
      content: textResponse,
      role: "assistant",
      sources,
      closed: close,
      error,
      errorMsg,
      animate: !close,
      pending: false,
      sentAt,
    });
  } else if (type === "textResponseChunk") {
    const chatIdx = _chatHistory.findIndex((chat: any) => chat.id === uuid);
    if (chatIdx !== -1) {
      const existingHistory = { ..._chatHistory[chatIdx] };
      const updatedHistory = {
        ...existingHistory,
        content: existingHistory.content + textResponse,
        sources,
        error,
        errorMsg,
        closed: close,
        animate: !close,
        pending: false,
        sentAt,
      };
      _chatHistory[chatIdx] = updatedHistory;
    } else {
      _chatHistory.push({
        id: uuid,
        sources,
        error,
        errorMsg,
        content: textResponse,
        role: "assistant",
        closed: close,
        animate: !close,
        pending: false,
        sentAt,
      });
    }
    setChatHistory([..._chatHistory]);
    if (close) {
      setLoadingResponse(false);
    }
  }
}

export function chatPrompt(workspace: any) {
  return (
    workspace?.openAiPrompt ??
    "Given the following conversation, relevant context, and a follow up question, reply with an answer to the current question the user is asking. Return only your response to the question given the above information following the users instructions as needed."
  );
}
