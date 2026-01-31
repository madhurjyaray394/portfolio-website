import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import MobileBottomBar from "@/components/MobileBottomBar";
import DesktopDock from "@/components/DesktopDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madhurjya Ray",
  description: "portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="hidden md:block">
          <Header />
        </div>
        {children}

        {/* Standalone Audio Player */}
        {/* <AudioPlayer /> */}

        {/* Desktop Dock (Nav Only) */}
        <DesktopDock />

        {/* Mobile Bottom Bar (Nav Only) */}
        <MobileBottomBar />
      </body>
    </html>
  );
}
