import type { Metadata } from "next";
import "./globals.css";
import "../styles/theme.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nedal Agha Web Development",
    template: "%s | Nedal Agha Web Development",
  },
  description: "Professional web development studio with an MVP-first architecture.",
  openGraph: {
    title: "Nedal Agha Web Development",
    description: "Professional web development studio with an MVP-first architecture.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nedal Agha Web Development",
    description: "Professional web development studio with an MVP-first architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
