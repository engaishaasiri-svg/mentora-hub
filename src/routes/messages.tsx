import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Video, Calendar, Check, X, ExternalLink } from "lucide-react";
import { useAuth } from "../lib/auth";
import { useChat, sendText, requestMeeting, respondMeeting } from "../lib/messaging";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Mentora — محادثة المرشد" },
      { name: "description", content: "تواصل مباشر بين الطالب والمرشد الأكاديمي مع جدولة اجتماعات Google Meet." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const { user } = useAuth();
  if (!user) return null;
  const role = user.role;
  const chat = useChat();
  const [text, setText] = useState("");
  const [showMeeting, setShowMeeting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chat.length]);

  const onSend = () => {
    if (!text.trim()) return;
    sendText(role, user.name, text.trim());
    setText("");
  };

  const counterpart = role === "student" ? "د. عبدالله القحطاني — مرشد أكاديمي" : "الطالب";

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-card border border-border/60 p-4 shadow-[var(--shadow-soft)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-full bg-primary/15 text-primary flex items-center justify-center font-black shrink-0">
            {role === "student" ? "م" : "ط"}
          </div>
          <div className="min-w-0">
            <div className="font-bold truncate">{counterpart}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> متصل الآن
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowMeeting((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold px-3 py-2 hover:opacity-90"
        >
          <Video className="h-4 w-4" /> طلب اجتماع
        </button>
      </div>

      {showMeeting && (
        <MeetingForm
          onCancel={() => setShowMeeting(false)}
          onSubmit={(dt, note) => {
            requestMeeting(role, user.name, dt, note);
            setShowMeeting(false);
          }}
        />
      )}

      <div
        ref={scrollRef}
        className="rounded-2xl bg-card border border-border/60 p-3 h-[55vh] overflow-y-auto space-y-2"
      >
        {chat.map((m) => {
          const mine = m.from === role;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm ${
                  mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {m.kind === "meeting" && m.meeting ? (
                  <MeetingCard
                    msgId={m.id}
                    text={m.text}
                    meeting={m.meeting}
                    mine={mine}
                    canRespond={!mine && m.meeting.status === "pending"}
                    onRespond={(ok) => respondMeeting(m.id, ok, role)}
                  />
                ) : (
                  <div className="whitespace-pre-wrap break-words">{m.text}</div>
                )}
                <div className={`text-[10px] mt-1 ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {m.authorName} · {new Date(m.time).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="اكتب رسالتك..."
          className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={onSend}
          className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90"
          aria-label="إرسال"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function MeetingForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (datetime: string, note: string) => void;
}) {
  const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);
  tomorrow.setMinutes(0, 0, 0);
  const defaultDT = tomorrow.toISOString().slice(0, 16);
  const [dt, setDt] = useState(defaultDT);
  const [note, setNote] = useState("");
  return (
    <div className="rounded-2xl bg-card border border-primary/40 p-4 shadow-[var(--shadow-soft)] space-y-3">
      <div className="flex items-center gap-2 font-bold text-sm">
        <Calendar className="h-4 w-4 text-primary" /> طلب اجتماع عبر Google Meet
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="datetime-local"
          value={dt}
          onChange={(e) => setDt(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="موضوع الاجتماع (اختياري)"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1.5 rounded-full text-xs font-bold bg-muted">
          إلغاء
        </button>
        <button
          onClick={() => onSubmit(new Date(dt).toISOString(), note)}
          className="px-3 py-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground"
        >
          إرسال الطلب
        </button>
      </div>
    </div>
  );
}

function MeetingCard({
  text,
  meeting,
  mine,
  canRespond,
  onRespond,
}: {
  msgId: string;
  text: string;
  meeting: { datetime: string; link: string; status: "pending" | "accepted" | "declined" };
  mine: boolean;
  canRespond: boolean;
  onRespond: (ok: boolean) => void;
}) {
  const statusLabel =
    meeting.status === "accepted" ? "مؤكد ✅" : meeting.status === "declined" ? "مرفوض ❌" : "بانتظار الرد";
  const tone = mine ? "bg-white/10" : "bg-card border border-border/60";
  return (
    <div className={`rounded-xl p-2.5 ${tone} space-y-2`}>
      <div className="flex items-center gap-1.5 text-xs font-black">
        <Video className="h-3.5 w-3.5" /> اجتماع Google Meet
      </div>
      <div className="text-xs">{text}</div>
      <div className="text-[11px] opacity-80">
        🗓 {new Date(meeting.datetime).toLocaleString("ar-SA", { dateStyle: "medium", timeStyle: "short" })}
      </div>
      <div className="text-[11px]">الحالة: {statusLabel}</div>
      {meeting.status === "accepted" && (
        <a
          href={meeting.link}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1 text-[11px] font-bold underline ${mine ? "" : "text-primary"}`}
        >
          <ExternalLink className="h-3 w-3" /> انضمام للاجتماع
        </a>
      )}
      {canRespond && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onRespond(true)}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-success text-white text-[11px] font-bold py-1.5"
          >
            <Check className="h-3 w-3" /> قبول
          </button>
          <button
            onClick={() => onRespond(false)}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-destructive text-white text-[11px] font-bold py-1.5"
          >
            <X className="h-3 w-3" /> رفض
          </button>
        </div>
      )}
    </div>
  );
}