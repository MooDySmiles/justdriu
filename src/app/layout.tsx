import "@/styles/globals.css";

import { type Metadata } from "next";
import WebComponentsWrapper from "@/app/_components/web_components_wrapper";

export const metadata: Metadata = {
  title: "Just Driù",
  description: "Qualcuno ha detto Just Driù?",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className="m-0 h-screen">
        <WebComponentsWrapper>
          <main className="h-full">{children}</main>
        </WebComponentsWrapper>
      </body>
    </html>
  );
}
