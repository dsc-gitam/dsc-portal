import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GDGoC GITAM Portal | Core Team Management",
  description: "Google Developer Groups on Campus 2025 - Core Team Management Portal",
  keywords: ["GDGoC", "GITAM", "Google Developer Groups", "Core Team", "Recruitment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
