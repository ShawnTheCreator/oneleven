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
          <div className="header-inner center">
            <div className="brand">
              <div className="brand-mark tri">
                <span />
                <span />
                <span />
              </div>
              <span>ONE ELEVEN</span>
            </div>
            <div className="creator">Created by Shawn</div>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
