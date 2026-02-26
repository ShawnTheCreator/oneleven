"use client";
import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "One Eleven: API Validator",
  description: "Internal tool to validate the webhook endpoint quickly.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-inner">
            <div className="brand">
              <div className="brand-mark" />
              <span>ONE ELEVEN</span>
            </div>
            <nav className="nav">
              <span>Home</span>
              <span>Partners & Projects</span>
              <span>About Us</span>
            </nav>
            <button className="btn">Contact Us</button>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

