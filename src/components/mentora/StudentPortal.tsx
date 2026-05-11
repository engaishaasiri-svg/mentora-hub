import { useState } from "react";
import {
  Home, BookOpen, BarChart3, Target, MessageSquare, GraduationCap, Briefcase,
  AlertTriangle, TrendingUp, CheckCircle2, Circle, Clock, Send,
} from "lucide-react";
import { Shell, type NavItem } from "./Shell";
import { actions, useStore } from "./store";
import {
  TEAL, NAVY, PURPLE, DANGER, WARN, SUCCESS, MUTED, BORDER, FF,
  card, Donut, Bar, Chip, StatCard, SectionTitle, Btn,
} from "./shared";

const nav: NavItem[] = [
  { key: "home", label: "الرئيسية", icon: <Home size={18} /> },
  { key: "academic", label: "الأداء الأكاديمي", icon: <BarChart3 size={18} /> },
  { key: "skills", label: "المهارات", icon: <GraduationCap size={18} /> },
  { key: "plan", label: "الخطة الذكية", icon: <Target size={18} /> },
  { key: "career", label: "المسار المهني", icon: <Briefcase size={18} /> },
  { key: "reports", label: "التقارير", icon: <BarChart3 size={18} /> },
  { key: "mentor", label: "المرشد", icon: <MessageSquare size={18} /> },
  { key: "courses", label: "المواد الدراسية", icon: <BookOpen size={18} /> },
];

export function StudentPortal() {
  const [page, setPage] = useState("home");
  const titles: Record<string, string> = {
    home: "مرحباً بك 👋", academic: "الأداء الأكاديمي", skills: "المهارات الأساسية",
    plan: "خطتك الذكية", career: "المسار المهني", reports: "تقاريري",
    mentor: "تواصل مع المرشد", courses: "المواد الدراسية",
  };

  return (
    <Shell themeColor={TEAL} navItems={nav} current={page} onNav={setPage} title={titles[page]}>
      {page === "home" && <HomeView />}
      {page === "academic" && <Academic />}
      {page === "skills" && <Skills />}
      {page === "plan" && <Plan />}
      {page === "career" && <Career />}
      {page === "reports" && <Reports />}
      {page === "mentor" && <MentorChat />}
      {page === "courses" && <Courses />}
    </Shell>
  );
}

function HomeView() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Academic Alert */}
      <div style={{
        ...card, background: "#fef2f2", borderColor: DANGER, borderWidth: 2,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <AlertTriangle size={28} color={DANGER} />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, color: DANGER }}>تم اكتشاف تعثر أكاديمي!</h3>
            <p style={{ margin: "4px 0 10px", color: NAVY, fontSize: 14 }}>
              الذكاء الاصطناعي لاحظ انخفاضاً في أداء "تحليل البيانات". تم إنشاء خطة علاجية.
            </p>
            <Btn size="sm" color={DANGER} variant="outline">عرض الخطة العلاجية</Btn>
          </div>
        </div>
      </div>

      {/* Welcome velocity */}
      <div style={{ ...card, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <Donut value={78} color={TEAL} label="سرعة التعلم" />
        <div style={{ flex: 1, minWidth: 180 }}>
          <h3 style={{ margin: 0, color: NAVY, fontSize: 16 }}>Learning Velocity</h3>
          <p style={{ margin: "6px 0", color: MUTED, fontSize: 13 }}>
            سرعتك في التعلم تفوق 68% من زملائك. استمر بهذا الإيقاع!
          </p>
          <div style={{ display: "flex", gap: 6, alignItems: "center", color: SUCCESS, fontSize: 13, fontWeight: 600 }}>
            <TrendingUp size={16} /> +12% عن الشهر السابق
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        <StatCard icon={<GraduationCap size={18} />} title="التقدم نحو التخرج" value="68%" sub="102 من 150 ساعة" accent={SUCCESS} />
        <StatCard icon="⭐" title="المعدل التراكمي" value="3.65 / 5" sub="جيد جداً" accent={WARN} />
        <StatCard icon="✅" title="الحضور" value="92%" accent={TEAL} />
        <StatCard icon="🛡️" title="مستوى المخاطر" value="منخفض" sub="استمرار جيد" accent={DANGER} />
      </div>

      {/* Career snippet */}
      <div style={card}>
        <SectionTitle>مسارك المهني المقترح 💼</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Donut value={65} color={PURPLE} size={84} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: NAVY }}>محلل بيانات مبتدئ</div>
            <div style={{ color: MUTED, fontSize: 12, marginBottom: 8 }}>توافق مع مهاراتك الحالية</div>
            <Btn size="sm" color={PURPLE}>عرض التفاصيل</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function Academic() {
  const subs = [
    { g: "B+", c: SUCCESS, n: "هياكل البيانات", v: 82 },
    { g: "B", c: SUCCESS, n: "قواعد البيانات", v: 76 },
    { g: "C+", c: WARN, n: "تحليل الأنظمة", v: 65 },
    { g: "C", c: WARN, n: "الرياضيات المتقطعة", v: 58 },
    { g: "A", c: SUCCESS, n: "تطوير الويب", v: 90 },
  ];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        <StatCard icon="📅" title="الحضور" value="92%" accent={TEAL} />
        <StatCard icon="⭐" title="المعدل" value="3.65" accent={WARN} />
        <StatCard icon="✅" title="الواجبات" value="85%" accent={SUCCESS} />
        <StatCard icon="📈" title="الترتيب" value="12/120" accent={PURPLE} />
      </div>
      <div style={card}>
        <SectionTitle>أدائك في المقررات</SectionTitle>
        {subs.map((m) => (
          <div key={m.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
            <span style={{ width: 32, height: 32, borderRadius: "50%", background: m.c + "22", color: m.c, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12 }}>{m.g}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                <span style={{ color: NAVY }}>{m.n}</span>
                <span style={{ color: MUTED }}>{m.v}%</span>
              </div>
              <Bar value={m.v} color={m.c} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...card, background: "#fffdf2", borderInlineStart: `5px solid ${WARN}` }}>
        <h3 style={{ margin: 0, color: NAVY }}>تنبيه ذكي ⚠️</h3>
        <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 14 }}>
          مستوى التقدم في تحليل البيانات يتطلب مراجعة إضافية هذا الأسبوع.
        </p>
      </div>
    </div>
  );
}

function Skills() {
  const skills = [
    { n: "التفكير التحليلي", v: 78 },
    { n: "التواصل", v: 70 },
    { n: "حل المشكلات", v: 65 },
    { n: "العمل الجماعي", v: 82 },
    { n: "المهارات التقنية", v: 88 },
  ];
  return (
    <div style={card}>
      <SectionTitle>مستواك مقابل المطلوب للوظائف</SectionTitle>
      {skills.map((s) => (
        <div key={s.n} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
            <span style={{ color: NAVY }}>{s.n}</span>
            <span style={{ color: TEAL, fontWeight: 700 }}>{s.v}%</span>
          </div>
          <Bar value={s.v} />
        </div>
      ))}
    </div>
  );
}

function Plan() {
  const tasks = useStore((s) => s.tasks);
  const completed = tasks.filter((t) => t.status === "done").length;
  const pct = Math.round((completed / tasks.length) * 100);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ ...card, background: NAVY, color: "#fff" }}>
        <Chip label="نشطة" color="#fff" bg={TEAL} />
        <h2 style={{ margin: "8px 0 4px", fontSize: 18 }}>خطة التفوق في التحليل الإحصائي</h2>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>10 مارس - 25 مايو 2024</p>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span>التقدم</span><span>{pct}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,.2)", borderRadius: 999, height: 6, marginTop: 4 }}>
          <div style={{ width: `${pct}%`, background: TEAL, height: "100%", borderRadius: 999 }} />
        </div>
      </div>

      <div style={card}>
        <SectionTitle>مراحل الخطة (اضغط لتغيير الحالة)</SectionTitle>
        {tasks.map((t, i) => {
          const StatusIcon = t.status === "done" ? CheckCircle2 : t.status === "in_progress" ? Clock : Circle;
          const statusColor = t.status === "done" ? SUCCESS : t.status === "in_progress" ? WARN : MUTED;
          const statusLabel = t.status === "done" ? "مكتملة" : t.status === "in_progress" ? "قيد التنفيذ" : "لم تبدأ";
          const prioColor = t.priority === "high" ? DANGER : t.priority === "medium" ? WARN : MUTED;
          return (
            <div key={t.id} onClick={() => actions.toggleTask(t.id)} style={{
              display: "flex", gap: 10, padding: "12px 0", borderBottom: `1px solid ${BORDER}`,
              cursor: "pointer", alignItems: "center",
            }}>
              <StatusIcon size={22} color={statusColor} />
              <div style={{ flex: 1 }}>
                <div style={{ color: NAVY, fontSize: 14, fontWeight: 600,
                  textDecoration: t.status === "done" ? "line-through" : "none",
                  opacity: t.status === "done" ? 0.6 : 1 }}>{i + 1}. {t.title}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  <Chip label={statusLabel} color={statusColor} />
                  <Chip label={`أولوية ${t.priority === "high" ? "عالية" : t.priority === "medium" ? "متوسطة" : "منخفضة"}`} color={prioColor} />
                  {t.due && <Chip label={t.due} color={MUTED} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Career() {
  const jobs = [
    { n: "محلل بيانات مبتدئ", v: 65, c: TEAL },
    { n: "مطور ويب مبتدئ", v: 58, c: PURPLE },
    { n: "أخصائي ذكاء أعمال", v: 53, c: WARN },
    { n: "أخصائي نظم معلومات", v: 48, c: DANGER },
  ];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={card}>
        <SectionTitle>أفضل الوظائف المناسبة لك</SectionTitle>
        {jobs.map((j) => (
          <div key={j.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${BORDER}` }}>
            <Donut value={j.v} color={j.c} size={64} />
            <div style={{ flex: 1 }}>
              <div style={{ color: NAVY, fontWeight: 700 }}>{j.n}</div>
              <div style={{ color: MUTED, fontSize: 12 }}>توافق مع مهاراتك</div>
            </div>
            <Btn size="sm" color={j.c} variant="outline">عرض</Btn>
          </div>
        ))}
      </div>
      <div style={card}>
        <SectionTitle>توصية مخصصة لك</SectionTitle>
        <p style={{ margin: 0, color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
          نوصيك بالتركيز على تطوير مهاراتك الرقمية من خلال دورة "أساسيات تحليل البيانات".
        </p>
        <div style={{ marginTop: 10 }}>
          <Btn color={TEAL} onClick={() => actions.addNotif({ title: "تم التسجيل", body: "تم تسجيلك في دورة تحليل البيانات", type: "success" })}>
            استكشاف الدورة ←
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Reports() {
  const data = [
    { n: "الإحصاء", a: 60, b: 48 },
    { n: "الإدارة", a: 58, b: 55 },
    { n: "الاقتصاد", a: 65, b: 42 },
    { n: "نظم", a: 70, b: 50 },
    { n: "التواصل", a: 75, b: 58 },
  ];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={card}>
        <SectionTitle>مؤشر الأداء العام</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <Donut value={78} color={TEAL} />
          <div style={{ flex: 1, minWidth: 180 }}>
            <p style={{ margin: 0, color: NAVY, fontSize: 14 }}>📈 أداؤك أفضل من 68% من زملائك</p>
            <p style={{ margin: "8px 0 0", color: NAVY, fontSize: 14 }}>↗️ تحسن +12% عن الشهر الماضي</p>
            <p style={{ margin: "8px 0 0", color: MUTED, fontSize: 13 }}>المجال للتحسين: المهارات الرقمية</p>
          </div>
        </div>
      </div>
      <div style={card}>
        <SectionTitle>أداء المواد</SectionTitle>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: 160, gap: 8 }}>
          {data.map((m) => (
            <div key={m.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120 }}>
                <div style={{ width: 12, height: m.a + "%", background: TEAL, borderRadius: 3 }} />
                <div style={{ width: 12, height: m.b + "%", background: PURPLE, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 10, color: MUTED, textAlign: "center" }}>{m.n}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 10, fontSize: 11, color: MUTED }}>
          <span><span style={{ display: "inline-block", width: 10, height: 10, background: TEAL, borderRadius: 2, marginInlineEnd: 4 }} />متوسطك</span>
          <span><span style={{ display: "inline-block", width: 10, height: 10, background: PURPLE, borderRadius: 2, marginInlineEnd: 4 }} />متوسط القسم</span>
        </div>
      </div>
      <div style={card}>
        <SectionTitle>نقاط القوة</SectionTitle>
        <Chip label="مهارات التواصل" color={SUCCESS} />
        <Chip label="المشاركة" color={SUCCESS} />
        <Chip label="الالتزام بالمواعيد" color={SUCCESS} />
      </div>
      <div style={card}>
        <SectionTitle>نقاط تحتاج تحسين</SectionTitle>
        <Chip label="المهارات الرقمية" color={DANGER} />
        <Chip label="إدارة الوقت" color={DANGER} />
        <Chip label="حل المشكلات" color={DANGER} />
      </div>
    </div>
  );
}

function MentorChat() {
  const msgs = useStore((s) => s.mentorChat);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    actions.sendMentorChat(input.trim(), "user");
    setInput("");
    setTimeout(() => actions.sendMentorChat("شكراً لمشاركتك، سأراجع تقدمك وأرد عليك قريباً.", "mentor"), 800);
  };
  return (
    <div style={{ ...card, padding: 0, overflow: "hidden" }}>
      <div style={{ background: TEAL, color: "#fff", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", color: TEAL, display: "grid", placeItems: "center", fontWeight: 700 }}>س</div>
        <div>
          <div style={{ fontWeight: 700 }}>د. سارة العتيبي</div>
          <div style={{ fontSize: 11, opacity: .8 }}>مرشدتك الأكاديمية • متصل</div>
        </div>
      </div>
      <div style={{ padding: 12, height: 360, overflowY: "auto", background: "#f9fafb" }}>
        {msgs.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-start" : "flex-end", marginBottom: 8 }}>
            <div style={{
              maxWidth: "75%", padding: "8px 12px", borderRadius: 14,
              background: m.from === "user" ? "#fff" : TEAL, color: m.from === "user" ? NAVY : "#fff",
              fontSize: 13, border: m.from === "user" ? `1px solid ${BORDER}` : "none",
            }}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: 10, borderTop: `1px solid ${BORDER}`, display: "flex", gap: 6 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="اكتب رسالة لمرشدك..." style={{
            flex: 1, padding: "10px 12px", borderRadius: 10, border: `1px solid ${BORDER}`,
            fontFamily: FF, fontSize: 13, outline: "none",
          }} />
        <button onClick={send} style={{
          background: TEAL, color: "#fff", border: "none", borderRadius: 10, padding: "0 14px",
          cursor: "pointer", display: "grid", placeItems: "center",
        }}><Send size={16} /></button>
      </div>
    </div>
  );
}

function Courses() {
  const courses = [
    { n: "تحليل البيانات", t: "د. خالد", g: 55, locked: false },
    { n: "هياكل البيانات", t: "د. منى", g: 82, locked: false },
    { n: "قواعد البيانات", t: "د. أحمد", g: 76, locked: false },
    { n: "الذكاء الاصطناعي", t: "د. ليلى", g: 0, locked: true },
  ];
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {courses.map((c) => (
        <div key={c.n} style={{ ...card, opacity: c.locked ? 0.6 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 700, color: NAVY }}>{c.n}</div>
              <div style={{ color: MUTED, fontSize: 12 }}>{c.t}</div>
            </div>
            {c.locked ? <Chip label="🔒 مقفلة" color={DANGER} /> : <Chip label={`${c.g}%`} color={c.g >= 70 ? SUCCESS : WARN} />}
          </div>
          {!c.locked && <Bar value={c.g} color={c.g >= 70 ? SUCCESS : WARN} />}
        </div>
      ))}
    </div>
  );
}
