import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { BackToTop } from "@/components/navigation/back-to-top";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { GradientBlobs } from "@/components/ui/gradient-blob";
import { FloatingCube } from "@/components/3d/floating-cube";
import { CursorTrail } from "@/components/ui/cursor-trail";
import { personalInfo } from "@/lib/resume-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${personalInfo.name} | Portfolio`,
  description: `${personalInfo.title} - ${personalInfo.tagline}. Explore my projects, skills, and experience in full-stack development, machine learning, and cloud computing.`,
  keywords: [
    "portfolio",
    "full-stack developer",
    "machine learning",
    "React",
    "Next.js",
    "Python",
    "IIIT Sri City",
  ],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} | Portfolio`,
    description: personalInfo.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <LenisProvider>
            <GradientBlobs />
            <FloatingCube />
            <CursorTrail />
            <Navbar />
            <main className="relative">{children}</main>
            <BackToTop />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
