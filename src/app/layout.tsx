import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wrtn Assignment",
    template: "%s | Wrtn Assignment",
  },
  description: "Wrtn Next.js 15 기반 프론트엔드 과제",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <body>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
