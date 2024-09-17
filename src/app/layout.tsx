import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { createClient } from "@utils/supabase/client";

export const metadata: Metadata = {
  title: "Just Driù",
  description: "Qualcuno ha detto Just Driù?",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
