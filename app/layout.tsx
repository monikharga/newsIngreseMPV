import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-display",
    weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "MiniRead",
    description: "News. Without the noise.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
{/* <meta name="google-site-verification" content="zVH-xzBqKu9U3W9ymBEpuEpTH295oldGR8IL06FZIP4" />      <body className="">{children}</body> */}
    </html>
  );
}
