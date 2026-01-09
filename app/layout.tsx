import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Inter,Zalando_Sans_Expanded } from "next/font/google";

import ToastProvider from "./providers/toast-provider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: [ "200", "300", "400", "500", "600", "700", "800", "900"],
   fallback: ["sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SnippetHub Pro",
  description:
    "SnippetHub Pro is a subscription-based code snippet manager for developers, allowing you to organize, manage, and search your code snippets efficiently by language, tags, and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${poppins.variable} ${inter.variable} selection:text-buttonColor selection:bg-white ${zalando.variable} `}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
