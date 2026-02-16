import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "T-Shirt Design Studio | AI-Powered Design Platform",
  description:
    "Create professional t-shirt designs using AI. Generate graphics, typography, patches, and PVC designs with Stability AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
