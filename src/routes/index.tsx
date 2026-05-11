import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/components/mentora/Login";
import { StudentPortal } from "@/components/mentora/StudentPortal";
import { MentorPortal } from "@/components/mentora/MentorPortal";
import { useStore } from "@/components/mentora/store";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mentora - منصة التوجيه الذكية" },
      { name: "description", content: "منصة Mentora التعليمية الذكية - بوابة الطالب والمرشد" },
    ],
  }),
});

function Index() {
  const session = useStore((s) => s.session);
  if (!session) return <Login />;
  if (session.role === "mentor") return <MentorPortal />;
  return <StudentPortal />;
}
