import { fetchEventSource } from "@microsoft/fetch-event-source";
import { generateUUID as v4 } from "@/lib/utils";
import I18n from "@/lib/i18n/i18n";

console.log("I18n", I18n);

let ctrl: AbortController;

const ChatService = {
  embedSessionHistory: async function (embedId: string, sessionId: string) {
    return await fetch(`/api/embed/${embedId}/${sessionId}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(I18n.t("invalidResponse"));
      })
      .then((res) => {
        return res.history.map((msg: any) => ({
          ...msg,
          id: v4(),
          sender: msg.role === "user" ? "user" : "system",
          textResponse: msg.content,
          close: false,
        }));
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  },
  resetEmbedChatSession: async function (embedId: string, sessionId: string) {
    return await fetch(`/api/embed/${embedId}/${sessionId}`, {
      method: "DELETE",
    })
      .then((res) => res.ok)
      .catch(() => false);
  },
  streamChat: async function (
    sessionId: string,
    embedSettings: any,
    message: string,
    handleChat: any
  ) {
    const { embedId, username } = embedSettings;
    const overrides = {
      prompt: embedSettings?.prompt ?? null,
      model: embedSettings?.model ?? null,
      temperature: embedSettings?.temperature ?? null,
    };
    ctrl = new AbortController();
    await fetchEventSource(`/api/embed/${embedId}/stream-chat`, {
      method: "POST",
      body: JSON.stringify({
        message,
        sessionId,
        username,
        ...overrides,
      }),
      signal: ctrl.signal,
      openWhenHidden: true,
      async onopen(response) {
        if (response.ok) {
          return; // everything's good
        } else if (response.status >= 400) {
          await response
            .json()
            .then((serverResponse) => {
              handleChat(serverResponse);
            })
            .catch(() => {
              handleChat({
                id: v4(),
                type: "abort",
                textResponse: null,
                sources: [],
                close: true,
                error: I18n.t("error", [response.status]),
              });
            });
          ctrl.abort();
          throw new Error();
        } else {
          handleChat({
            id: v4(),
            type: "abort",
            textResponse: null,
            sources: [],
            close: true,
            error: I18n.t("errorUnknow"),
          });
          ctrl.abort();
          throw new Error(I18n.t("unknown"));
        }
      },
      async onmessage(msg) {
        try {
          const chatResult = JSON.parse(msg.data);
          handleChat(chatResult);
        } catch {}
      },
      onerror(err) {
        handleChat({
          id: v4(),
          type: "abort",
          textResponse: null,
          sources: [],
          close: true,
          error: I18n.t("errorMsg", [err.message]),
        });
        ctrl.abort();
        throw new Error();
      },
    });
  },
  stop: async function () {
    ctrl?.abort?.();
  },
};

export default ChatService;
