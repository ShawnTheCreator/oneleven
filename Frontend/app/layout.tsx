import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "One Eleven: API Validator",
  description: "Internal tool to validate the webhook endpoint quickly.",
  metadataBase: new URL("https://oneleven.vercel.app"),
  icons: {
    icon: ["/favicon.svg", "/favicon.ico", "/icon.ico"],
    shortcut: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"]
  },
  openGraph: {
    title: "One Eleven: API Validator",
    description: "Validate your webhook endpoint and see results with a clear success animation.",
    url: "https://oneleven.vercel.app",
    siteName: "One Eleven",
    images: [
      { url: "/icon.ico", width: 256, height: 256, alt: "One Eleven" }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "One Eleven: API Validator",
    description: "Quick validator for your webhook with Live, Direct and Offline modes.",
    images: ["/icon.ico"]
  },
  alternates: {
    canonical: "https://oneleven.vercel.app"
  },
  keywords: ["One Eleven", "API", "Validator", "Webhook", "Sorting"],
  authors: [{ name: "Shawn" }],
  themeColor: "#0b0505"
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
