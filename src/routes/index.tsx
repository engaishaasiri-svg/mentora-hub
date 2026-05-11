import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mentora - منصة ليان التعليمية" },
      { name: "description", content: "منصة ليان التعليمية الذكية" },
    ],
  }),
});

function Index() {
  const [page, setPage] = useState<"home" | "plan" | "reports">("home");

  const fontFamily = "'Tajawal', sans-serif";
  const primary = "var(--mentora-primary)";
  const dark = "var(--mentora-dark)";
  const bg = "var(--mentora-bg)";
  const shadow = "var(--mentora-shadow)";

  const navBtn = (key: typeof page, label: string) => (
    <button
      onClick={() => setPage(key)}
      style={{
        marginInlineStart: 10,
        padding: "10px 20px",
        border: "none",
        background: page === key ? primary : "transparent",
        color: "#fff",
        borderRadius: 8,
        cursor: "pointer",
        fontFamily,
        transition: "0.3s",
        fontSize: 15,
      }}
    >
      {label}
    </button>
  );

  const card: React.CSSProperties = {
    background: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
    boxShadow: shadow,
    transition: "transform 0.3s ease",
  };

  const gridItem: React.CSSProperties = {
    ...card,
    marginBottom: 0,
    textAlign: "center",
    fontWeight: 500,
  };

  const timelineItem = (text: string) => (
    <li
      style={{
        background: "#fff",
        padding: 15,
        margin: "10px 0",
        borderRadius: 12,
        borderInlineStart: `5px solid ${primary}`,
        boxShadow: shadow,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {text}
    </li>
  );

  return (
    <div dir="rtl" style={{ fontFamily, background: bg, color: "#333", minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 5%",
          background: dark,
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: "bold", color: primary }}>Mentora</div>
        <div>
          {navBtn("home", "الرئيسية")}
          {navBtn("plan", "خطتي")}
          {navBtn("reports", "تقاريري")}
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "30px auto", padding: "0 20px", animation: "mentoraFadeIn 0.5s ease" }}>
        {page === "home" && (
          <section>
            <h1 style={{ color: dark, marginBottom: 25 }}>مرحبًا، ليان 👋</h1>

            <div style={card}>
              <h3 style={{ marginTop: 0, color: "#555" }}>مؤشر الأداء العام</h3>
              <p style={{ fontSize: 32, fontWeight: 700, color: primary, margin: 0 }}>78%</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15, marginBottom: 20 }}>
              <div style={gridItem}>📊 الحضور: 92%</div>
              <div style={gridItem}>⭐ المعدل: 3.65</div>
              <div style={gridItem}>✅ الواجبات: 85%</div>
            </div>

            <div
              style={{
                ...card,
                borderInlineStart: "5px solid var(--mentora-warning)",
                background: "var(--mentora-warning-bg)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#555" }}>تنبيه ذكي ⚠️</h3>
              <p style={{ margin: 0 }}>
                مستوى التقدم في مادة تحليل البيانات يتطلب مراجعة إضافية هذا الأسبوع.
              </p>
            </div>
          </section>
        )}

        {page === "plan" && (
          <section>
            <h1 style={{ color: dark, marginBottom: 25 }}>خطتك الذكية 🎯</h1>

            <div style={card}>
              <h3 style={{ marginTop: 0, color: "#555" }}>الهدف الحالي</h3>
              <p style={{ margin: 0 }}>إتقان مهارات تحليل البيانات المتقدمة</p>
            </div>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {timelineItem("📘 مراجعة أساسيات الإحصاء الوصفي")}
              {timelineItem("📊 تدريب عملي على مكتبات Pandas & NumPy")}
              {timelineItem("🧪 اختبار تقييم منتصف المدة")}
              {timelineItem("💼 تسليم المشروع التطبيقي النهائي")}
            </ul>
          </section>
        )}

        {page === "reports" && (
          <section>
            <h1 style={{ color: dark, marginBottom: 25 }}>تقارير الأداء 📈</h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15, marginBottom: 20 }}>
              <div style={gridItem}>
                <h3 style={{ marginTop: 0, color: "#555" }}>الأداء العام</h3>
                <p style={{ margin: 0 }}>78% - جيد جداً</p>
              </div>
              <div style={gridItem}>
                <h3 style={{ marginTop: 0, color: "#555" }}>نقاط القوة</h3>
                <p style={{ margin: 0 }}>التواصل الفعال - الالتزام بالمواعيد</p>
              </div>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0, color: "#555" }}>مجالات التحسين</h3>
              <p style={{ margin: 0, lineHeight: 1.8 }}>
                • تحليل البيانات العميقة
                <br />
                • مهارات إدارة الوقت خلال الاختبارات
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
