"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, ShieldCheck } from "lucide-react";
import { createBrowserSupabaseClient } from "@gio4x/supabase";
import { useSession } from "@/lib/session-provider";
import { getOrCreateMyConversation, sendChatMessage } from "@/lib/chat-actions";

type ChatMsg = {
  id: string;
  body: string;
  is_staff_reply: boolean;
  created_at: string;
};

// Floating customer live-chat launcher. Mounted globally; renders nothing for
// signed-out users, staff (they use /staff/chats), and on auth/staff routes.
export function LiveChatWidget() {
  const pathname = usePathname();
  const { userId, profile } = useSession();

  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isStaff = profile?.role === "staff" || profile?.role === "admin";
  const hiddenRoute = pathname.startsWith("/auth") || pathname.startsWith("/staff");
  const enabled = !!userId && !isStaff && !hiddenRoute;

  // Allow other UI (e.g. the Support page card) to open the widget.
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("gio4x:open-chat", handler);
    return () => window.removeEventListener("gio4x:open-chat", handler);
  }, []);

  const bootstrap = useCallback(async () => {
    const res = await getOrCreateMyConversation();
    if (!res.ok || !res.conversationId) {
      setError(res.ok ? "Could not start chat." : res.error);
      return;
    }
    setConversationId(res.conversationId);

    const supabase = createBrowserSupabaseClient();
    const { data } = await supabase
      .from("chat_messages")
      .select("id, body, is_staff_reply, created_at")
      .eq("conversation_id", res.conversationId)
      .order("created_at", { ascending: true });
    setMessages((data as ChatMsg[]) ?? []);
    setReady(true);
  }, []);

  // Bootstrap conversation + initial messages the first time the panel opens.
  useEffect(() => {
    if (open && enabled && !conversationId) void bootstrap();
  }, [open, enabled, conversationId, bootstrap]);

  // Realtime: append new messages for this conversation.
  useEffect(() => {
    if (!conversationId) return;
    const supabase = createBrowserSupabaseClient();
    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const m = payload.new as ChatMsg;
          setMessages((prev) => (prev.some((p) => p.id === m.id) ? prev : [...prev, m]));
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  if (!enabled) return null;

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !conversationId || sending) return;
    setSending(true);
    setError(null);
    // optimistic echo
    const optimistic: ChatMsg = {
      id: `tmp-${Date.now()}`,
      body: text,
      is_staff_reply: false,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft("");
    const res = await sendChatMessage(conversationId, text);
    if (!res.ok) {
      setError(res.error);
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    }
    setSending(false);
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close live chat" : "Open live chat"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky to-navy text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky/40"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {open ? (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-navy px-4 py-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <ShieldCheck size={18} />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">GIO4X Live Support</div>
              <div className="text-[11px] text-white/70">Typically replies in a few minutes</div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto bg-slate-50 px-3 py-3">
            {!ready ? (
              <div className="flex h-full items-center justify-center text-xs text-steel">
                Connecting you to support…
              </div>
            ) : messages.length === 0 ? (
              <div className="px-2 py-6 text-center text-xs text-steel">
                Hi! 👋 Send us a message and a GIO4X agent will be with you shortly.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={m.is_staff_reply ? "flex justify-start" : "flex justify-end"}
                >
                  <div
                    className={
                      m.is_staff_reply
                        ? "max-w-[80%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-navy shadow-sm ring-1 ring-slate-200"
                        : "max-w-[80%] rounded-2xl rounded-br-sm bg-sky px-3 py-2 text-sm text-white"
                    }
                  >
                    <div className="whitespace-pre-wrap break-words">{m.body}</div>
                    <div
                      className={
                        m.is_staff_reply
                          ? "mt-0.5 text-[10px] text-steel-light"
                          : "mt-0.5 text-[10px] text-white/70"
                      }
                    >
                      {new Date(m.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {error ? (
            <div className="bg-rose-50 px-3 py-1.5 text-[11px] text-rose-700">{error}</div>
          ) : null}

          <form onSubmit={onSend} className="flex items-center gap-2 border-t border-slate-200 p-2.5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="min-w-0 flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm focus:border-sky focus:outline-none"
            />
            <button
              type="submit"
              disabled={sending || !draft.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky text-white transition hover:bg-sky-light disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
