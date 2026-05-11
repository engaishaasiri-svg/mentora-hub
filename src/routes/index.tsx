import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/mentora-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mentora - منصة التعلم الذكية" },
      { name: "description", content: "منصة Mentora التعليمية الذكية - نوجّهك اليوم لننجحك غداً" },
    ],
  }),
});

type PageKey = "home" | "academic" | "skills" | "plan" | "career" | "reports";

const FF = "'Tajawal', sans-serif";
const PRIMARY = "#0d9488";
const PRIMARY_SOFT = "#e6f7f4";
const DARK = "#1e2a44";
const MUTED = "#6b7280";
const BORDER = "#eef0f4";
const BG = "#f7f9fc";
const SUCCESS = "#10b981";
const WARN = "#f59e0b";
const DANGER = "#ef4444";
const PURPLE = "#7c6df2";

const card: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${BORDER}`,
  borderRadius: 16,
  padding: 18,
  boxShadow: "0 1px 2px rgba(16,24,40,.04)",
};

function Donut({ value, color = PRIMARY, size = 110 }: { value: number; color?: string; size?: number }) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#eef2f7" strokeWidth="10" fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={off}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={size * 0.22} fontWeight={700} fill={DARK}>
        {value}%
      </text>
    </svg>
  );
}

function Bar({ value, color = PRIMARY }: { value: number; color?: string }) {
  return (
    <div style={{ background: "#eef2f7", borderRadius: 999, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, background: color, height: "100%", borderRadius: 999 }} />
    </div>
  );
}

function StatCard({ icon, title, value, sub, accent }: { icon: string; title: string; value: string; sub?: string; accent: string }) {
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ color: MUTED, fontSize: 14 }}>{title}</span>
        <span
          style={{
            width: 36, height: 36, borderRadius: 10, background: accent + "22",
            display: "grid", placeItems: "center", fontSize: 18,
          }}
        >
          {icon}
        </span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: DARK }}>{value}</div>
      {sub && <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h2 style={{ margin: 0, fontSize: 18, color: DARK }}>{children}</h2>
      {action}
    </div>
  );
}

function Chip({ label, color = PRIMARY, bg }: { label: string; color?: string; bg?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: 999,
        background: bg || color + "1a",
        color,
        fontSize: 12,
        fontWeight: 600,
        margin: "4px 4px 0 0",
      }}
    >
      {label}
    </span>
  );
}

function Home() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Welcome */}
      <div style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, color: DARK, fontSize: 22 }}>
            مرحباً بك <span style={{ color: PRIMARY }}>👋</span>
          </h1>
          <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 14 }}>
            هنا نظرة شاملة على أدائك الأكاديمي والمهاري ومسارك المهني
          </p>
        </div>
        <img src={logo} alt="Mentora" style={{ height: 56 }} />
      </div>

      {/* Top Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
        <StatCard icon="🎓" title="التقدم نحو التخرج" value="68%" sub="102 من 150 ساعة معتمدة" accent={SUCCESS} />
        <StatCard icon="⭐" title="المعدل التراكمي" value="3.41 / 5" sub="جيد جداً" accent={WARN} />
        <StatCard icon="📚" title="المواد الحالية" value="6" sub="مواد هذا الفصل" accent={PURPLE} />
        <StatCard icon="🛡️" title="مستوى المخاطر" value="منخفض" sub="استمرار جيد" accent={DANGER} />
      </div>

      {/* Performance + Career */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 12 }}>
        <div style={card}>
          <SectionTitle>مؤشر الأداء العام</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Donut value={78} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: DARK, fontWeight: 600 }}>أنت تسير في الاتجاه الصحيح!</p>
              <p style={{ margin: "6px 0", color: MUTED, fontSize: 13 }}>
                استمر، وسنساعدك للوصول لأفضل النتائج.
              </p>
              <button
                style={{
                  marginTop: 6, padding: "8px 14px", border: `1px solid ${PRIMARY}`,
                  background: "#fff", color: PRIMARY, borderRadius: 10, cursor: "pointer", fontFamily: FF,
                }}
              >
                عرض التفاصيل
              </button>
            </div>
          </div>
        </div>

        <div style={card}>
          <SectionTitle>
            <span>مسارك المهني <span style={{ marginInlineStart: 4 }}>💼</span></span>
          </SectionTitle>
          <p style={{ margin: "0 0 10px", color: MUTED, fontSize: 13 }}>أفضل الوظائف المناسبة لك</p>
          <div style={{ background: "#f8fafc", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <Donut value={65} color={PURPLE} size={80} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: DARK }}>محلل بيانات مبتدئ</div>
              <div style={{ color: MUTED, fontSize: 12 }}>توافق مع مهاراتك</div>
            </div>
          </div>
          {[
            { name: "مطور ويب مبتدئ", v: 58 },
            { name: "أخصائي ذكاء أعمال", v: 53 },
            { name: "أخصائي نظم معلومات", v: 48 },
          ].map((j) => (
            <div key={j.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px dashed ${BORDER}` }}>
              <span style={{ color: DARK, fontSize: 14 }}>{j.name}</span>
              <span style={{ color: PURPLE, fontWeight: 700, fontSize: 13 }}>{j.v}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses performance */}
      <div style={card}>
        <SectionTitle action={<button style={linkBtn}>عرض الكل</button>}>أدائك في المقررات</SectionTitle>
        {[
          { g: "B+", c: "#10b981", n: "هياكل البيانات", v: 82 },
          { g: "B", c: "#10b981", n: "قواعد البيانات", v: 76 },
          { g: "C+", c: "#f59e0b", n: "تحليل الأنظمة", v: 65 },
          { g: "C", c: "#f59e0b", n: "الرياضيات المتقطعة", v: 58 },
          { g: "A", c: "#10b981", n: "تطوير الويب", v: 90 },
        ].map((m) => (
          <div key={m.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
            <span style={{ width: 32, height: 32, borderRadius: "50%", background: m.c + "22", color: m.c, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>{m.g}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: DARK, fontSize: 14 }}>{m.n}</span>
                <span style={{ color: MUTED, fontSize: 13 }}>{m.v}%</span>
              </div>
              <Bar value={m.v} color={m.c} />
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming tasks */}
      <div style={card}>
        <SectionTitle>المهام القادمة 📅</SectionTitle>
        {[
          { date: "25 مايو 2024", title: "واجب مشروع قواعد البيانات", due: "مستحق خلال يومين", color: DANGER },
          { date: "28 مايو 2024", title: "اختبار منتصف الفصل في تحليل الأنظمة", due: "مستحق خلال 5 أيام", color: WARN },
          { date: "2 يونيو 2024", title: "تسليم مشروع تطوير الويب", due: "مستحق خلال 10 أيام", color: PRIMARY },
        ].map((t) => (
          <div key={t.title} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: `1px solid ${BORDER}` }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.color }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: DARK, fontSize: 14, fontWeight: 600 }}>{t.title}</div>
              <div style={{ color: MUTED, fontSize: 12 }}>{t.date}</div>
            </div>
            <Chip label={t.due} color={t.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Academic() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0, color: DARK, fontSize: 22 }}>الأداء الأكاديمي 📊</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
        <StatCard icon="📅" title="الحضور" value="92%" accent={PRIMARY} />
        <StatCard icon="⭐" title="المعدل التراكمي" value="3.65" accent={WARN} />
        <StatCard icon="✅" title="إكمال الواجبات" value="85%" accent={SUCCESS} />
        <StatCard icon="📈" title="مستوى المخاطر" value="متوسط" accent={DANGER} />
      </div>
      <div style={{ ...card, background: "#fffdf2", borderInlineStart: `5px solid ${WARN}` }}>
        <h3 style={{ marginTop: 0, color: DARK }}>تنبيه ذكي ⚠️</h3>
        <p style={{ margin: 0, color: MUTED }}>
          مستوى التقدم في مادة تحليل البيانات يتطلب مراجعة إضافية هذا الأسبوع.
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
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0, color: DARK, fontSize: 22 }}>المهارات الأساسية 🎯</h1>
      <div style={card}>
        <SectionTitle>مستواك مقابل المطلوب للوظائف</SectionTitle>
        {skills.map((s) => (
          <div key={s.n} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: DARK, fontSize: 14 }}>{s.n}</span>
              <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 13 }}>{s.v}%</span>
            </div>
            <Bar value={s.v} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Plan() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0, color: DARK, fontSize: 22 }}>خطتك الذكية 🎯</h1>

      <div style={{ ...card, background: DARK, color: "#fff" }}>
        <Chip label="نشطة" color="#fff" bg={PRIMARY} />
        <h2 style={{ margin: "10px 0 6px", fontSize: 18 }}>خطة التفوق في التحليل الإحصائي</h2>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>10 مارس - 25 مايو 2024</p>
        <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.7 }}>
          خطة مخصصة لتحسين مستواك في مقرر التحليل الإحصائي وبناء مهارات تحليل البيانات.
        </p>
      </div>

      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: MUTED, fontSize: 13 }}>التقدم الكلي للخطة</span>
          <span style={{ color: PRIMARY, fontWeight: 700 }}>60%</span>
        </div>
        <Bar value={60} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 16, textAlign: "center" }}>
          {[
            { v: "8", l: "المهام الكلية" },
            { v: "5", l: "المكتملة" },
            { v: "2", l: "الاختبارات" },
            { v: "12", l: "الأيام المتبقية" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontSize: 22, fontWeight: 700, color: DARK }}>{s.v}</div>
              <div style={{ fontSize: 11, color: MUTED }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <SectionTitle>مراحل الخطة</SectionTitle>
        {[
          { i: "📘", t: "أساسيات الإحصاء", d: "مفاهيم أساسية في الإحصاء الوصفي والاستدلالي", s: "مكتملة", c: SUCCESS },
          { i: "📊", t: "تحليل البيانات", d: "التعرف على طرق تحليل البيانات وتفسيرها", s: "قيد التنفيذ 6%", c: WARN },
          { i: "🧪", t: "الاختبار والتطبيق", d: "تطبيق ما تم تعلمه على تمارين واختبارات", s: "لم تبدأ", c: MUTED },
          { i: "💼", t: "مشروع تطبيقي", d: "تنفيذ مشروع نهائي لتحليل بيانات حقيقية", s: "لم تبدأ", c: MUTED },
        ].map((p, idx) => (
          <div key={p.t} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${BORDER}` }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, background: PRIMARY_SOFT, display: "grid", placeItems: "center", fontSize: 18 }}>{p.i}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: DARK, fontWeight: 700, fontSize: 14 }}>{idx + 1}. {p.t}</div>
              <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{p.d}</div>
            </div>
            <Chip label={p.s} color={p.c} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Career() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0, color: DARK, fontSize: 22 }}>المسار المهني 💼</h1>
      <div style={card}>
        <SectionTitle>أفضل الوظائف المناسبة لك</SectionTitle>
        {[
          { n: "محلل بيانات مبتدئ", v: 65, c: PRIMARY },
          { n: "مطور ويب مبتدئ", v: 58, c: PURPLE },
          { n: "أخصائي ذكاء أعمال", v: 53, c: WARN },
          { n: "أخصائي نظم معلومات", v: 48, c: DANGER },
        ].map((j) => (
          <div key={j.n} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${BORDER}` }}>
            <Donut value={j.v} color={j.c} size={64} />
            <div style={{ flex: 1 }}>
              <div style={{ color: DARK, fontWeight: 700 }}>{j.n}</div>
              <div style={{ color: MUTED, fontSize: 12 }}>توافق مع مهاراتك</div>
            </div>
            <button style={{ ...linkBtn, color: j.c, borderColor: j.c }}>عرض</button>
          </div>
        ))}
      </div>

      <div style={card}>
        <SectionTitle>توصية مخصصة لك</SectionTitle>
        <p style={{ margin: 0, color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
          نوصيك بالتركيز على تطوير مهاراتك الرقمية من خلال دورة "أساسيات تحليل البيانات" المتاحة في المنصة.
        </p>
        <button style={{ marginTop: 12, padding: "10px 16px", background: PRIMARY, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FF }}>
          استكشاف الدورة ←
        </button>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0, color: DARK, fontSize: 22 }}>تقاريري 📈</h1>

      <div style={card}>
        <SectionTitle>مؤشر الأداء العام</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <Donut value={78} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: 0, color: DARK }}>📈 أداؤك أفضل من 68% من زملائك</p>
            <p style={{ margin: "8px 0 0", color: DARK }}>↗️ تحسن بمقدار 12% عن الشهر الماضي</p>
            <p style={{ margin: "8px 0 0", color: MUTED, fontSize: 13 }}>
              المجال الأكثر احتياجاً للتحسين: المهارات الرقمية
            </p>
          </div>
        </div>
      </div>

      <div style={card}>
        <SectionTitle>أداء المواد</SectionTitle>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: 160, gap: 10 }}>
          {[
            { n: "الإحصاء", a: 60, b: 48 },
            { n: "الإدارة", a: 58, b: 55 },
            { n: "الاقتصاد", a: 65, b: 42 },
            { n: "نظم", a: 70, b: 50 },
            { n: "التواصل", a: 75, b: 58 },
          ].map((m) => (
            <div key={m.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120 }}>
                <div style={{ width: 14, height: m.a + "%", background: PRIMARY, borderRadius: 4 }} />
                <div style={{ width: 14, height: m.b + "%", background: PURPLE, borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 11, color: MUTED, textAlign: "center" }}>{m.n}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, fontSize: 12, color: MUTED }}>
          <span><span style={{ display: "inline-block", width: 10, height: 10, background: PRIMARY, borderRadius: 2, marginInlineEnd: 4 }} />متوسطك</span>
          <span><span style={{ display: "inline-block", width: 10, height: 10, background: PURPLE, borderRadius: 2, marginInlineEnd: 4 }} />متوسط القسم</span>
        </div>
      </div>

      <div style={card}>
        <SectionTitle>نقاط القوة</SectionTitle>
        <div>
          <Chip label="مهارات التواصل" color={SUCCESS} />
          <Chip label="المشاركة في الأنشطة" color={SUCCESS} />
          <Chip label="الالتزام بالمواعيد" color={SUCCESS} />
        </div>
      </div>

      <div style={card}>
        <SectionTitle>نقاط تحتاج تحسين</SectionTitle>
        <div>
          <Chip label="المهارات الرقمية" color={DANGER} />
          <Chip label="إدارة الوقت" color={DANGER} />
          <Chip label="حل المشكلات" color={DANGER} />
        </div>
      </div>
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  padding: "6px 12px", border: `1px solid ${BORDER}`, background: "#fff", color: DARK,
  borderRadius: 8, cursor: "pointer", fontFamily: FF, fontSize: 12,
};

const NAV: { key: PageKey; label: string; icon: string }[] = [
  { key: "home", label: "الرئيسية", icon: "🏠" },
  { key: "academic", label: "الأداء الأكاديمي", icon: "📊" },
  { key: "skills", label: "المهارات", icon: "🎓" },
  { key: "plan", label: "الخطة العلاجية", icon: "📝" },
  { key: "career", label: "المسار المهني", icon: "💼" },
  { key: "reports", label: "التقارير", icon: "📈" },
];

function Index() {
  const [page, setPage] = useState<PageKey>("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <Home />;
      case "academic": return <Academic />;
      case "skills": return <Skills />;
      case "plan": return <Plan />;
      case "career": return <Career />;
      case "reports": return <Reports />;
    }
  };

  return (
    <div dir="rtl" style={{ fontFamily: FF, background: BG, color: DARK, minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Top bar */}
      <header
        style={{
          background: "#fff", borderBottom: `1px solid ${BORDER}`,
          padding: "12px 20px", display: "flex", alignItems: "center",
          justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50,
        }}
      >
        <img src={logo} alt="Mentora" style={{ height: 40 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ position: "relative", fontSize: 18 }}>
            🔔
            <span style={{ position: "absolute", top: -4, right: -6, background: DANGER, color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "grid", placeItems: "center" }}>3</span>
          </span>
          <span style={{ fontSize: 18 }}>✉️</span>
        </div>
      </header>

      {/* Bottom Nav (mobile) */}
      <nav
        style={{
          position: "fixed", bottom: 0, insetInline: 0, background: "#fff",
          borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-around",
          padding: "8px 4px", zIndex: 50, overflowX: "auto",
        }}
      >
        {NAV.map((n) => (
          <button
            key={n.key}
            onClick={() => setPage(n.key)}
            style={{
              border: "none", background: "transparent", padding: "6px 8px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              color: page === n.key ? PRIMARY : MUTED, cursor: "pointer", fontFamily: FF, fontSize: 11,
              minWidth: 64, fontWeight: page === n.key ? 700 : 400,
            }}
          >
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 16px 100px" }}>
        {renderPage()}
      </main>
    </div>
  );
}
