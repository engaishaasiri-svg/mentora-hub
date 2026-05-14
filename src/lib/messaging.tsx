import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Meeting = {
  datetime: string; // ISO
  link: string;
  status: "pending" | "accepted" | "declined";
};

export type ChatMessage = {
  id: string;
  from: "student" | "mentor";
  authorName: string;
  kind: "text" | "meeting";
  text: string;
  meeting?: Meeting;
  time: string; // ISO
};

export type InboxNotif = {
  id: string;
  title: string;
  body: string;
  time: string;
  tone: "info" | "warning" | "success";
  read: boolean;
};

type Store = {
  chat: ChatMessage[];
  inbox: { student: InboxNotif[]; mentor: InboxNotif[] };
};

const KEY = "mentora_messaging_v1";
const EVT = "mentora_messaging_change";

const seed: Store = {
  chat: [
    {
      id: "s1",
      from: "mentor",
      authorName: "د. عبدالله القحطاني",
      kind: "text",
      text: "أهلاً بك! أنا مرشدك الأكاديمي. متى تحب نلتقي لمراجعة خطتك العلاجية؟",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ],
  inbox: { student: [], mentor: [] },
};

function load(): Store {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { chat: parsed.chat ?? [], inbox: parsed.inbox ?? { student: [], mentor: [] } };
    }
  } catch {}
  return seed;
}

function save(s: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent(EVT));
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function pushInbox(s: Store, role: "student" | "mentor", n: Omit<InboxNotif, "id" | "read" | "time">) {
  s.inbox[role] = [
    { ...n, id: genId(), read: false, time: "الآن" },
    ...s.inbox[role],
  ];
}

export function getStore(): Store {
  return load();
}

export function sendText(from: "student" | "mentor", authorName: string, text: string) {
  const s = load();
  s.chat.push({ id: genId(), from, authorName, kind: "text", text, time: new Date().toISOString() });
  const target = from === "student" ? "mentor" : "student";
  pushInbox(s, target, {
    title: from === "student" ? "رسالة جديدة من طالب" : "رسالة جديدة من المرشد",
    body: text.slice(0, 80),
    tone: "info",
  });
  save(s);
}

export function requestMeeting(from: "student" | "mentor", authorName: string, datetime: string, note: string) {
  const s = load();
  const link = `https://meet.google.com/${Math.random().toString(36).slice(2, 5)}-${Math.random()
    .toString(36)
    .slice(2, 6)}-${Math.random().toString(36).slice(2, 5)}`;
  s.chat.push({
    id: genId(),
    from,
    authorName,
    kind: "meeting",
    text: note || "طلب اجتماع عبر Google Meet",
    meeting: { datetime, link, status: "pending" },
    time: new Date().toISOString(),
  });
  const target = from === "student" ? "mentor" : "student";
  pushInbox(s, target, {
    title: from === "student" ? "طلب اجتماع جديد من طالب" : "تم تحديد موعد اجتماع",
    body: `${new Date(datetime).toLocaleString("ar-SA")} — ${note || "Google Meet"}`,
    tone: "warning",
  });
  save(s);
}

export function respondMeeting(messageId: string, accept: boolean, responder: "student" | "mentor") {
  const s = load();
  const msg = s.chat.find((m) => m.id === messageId);
  if (!msg || !msg.meeting) return;
  msg.meeting.status = accept ? "accepted" : "declined";
  const target = msg.from; // notify the original requester
  pushInbox(s, target, {
    title: accept ? "تم قبول طلب الاجتماع ✅" : "تم رفض طلب الاجتماع",
    body: accept
      ? `الاجتماع مؤكد على ${new Date(msg.meeting.datetime).toLocaleString("ar-SA")} — ${msg.meeting.link}`
      : "تم رفض الموعد المقترح. اقترح موعداً آخر.",
    tone: accept ? "success" : "warning",
  });
  save(s);
}

export function consumeInbox(role: "student" | "mentor"): InboxNotif[] {
  const s = load();
  const items = s.inbox[role] ?? [];
  if (items.length === 0) return [];
  s.inbox[role] = [];
  save(s);
  return items;
}

// React hook to subscribe
const SubCtx = createContext<number>(0);
export function MessagingSubscriber({ children }: { children: ReactNode }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const onChange = () => setV((x) => x + 1);
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return <SubCtx.Provider value={v}>{children}</SubCtx.Provider>;
}
export function useMessagingTick() {
  return useContext(SubCtx);
}

export function useChat() {
  useMessagingTick();
  return getStore().chat;
}
