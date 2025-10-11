import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GDGoC GITAM Portal | Core Team Management",
  description:
    "Google Developer Groups on Campus 2025 - Core Team Management Portal",
  keywords: [
    "GDGoC",
    "GITAM",
    "Google Developer Groups",
    "Core Team",
    "Recruitment",
  ],
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
          <div className="absolute -z-10 overflow-hidden left-0 right-0 ">
            {/* Create a simple grid design of cells square 1:1 aspect */}
            <div className="grid grid-cols-10 w-screen overflow-hidden">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square border-[0.5px] border-black/10 overflow-hidden"
                />
              ))}
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
