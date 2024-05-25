import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { UserProvider } from "@/context/user";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quraja - Quran Revision Tracker",
  description:
    "Your Quran revision tracker. Don't lose track of your mistakes and keep track of which suwar you memorized and revised when. Get support and ease in doing your muraja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-red-200">
      <UserProvider>
        <body className={inter.className}>
          <Navbar></Navbar>
          {children}
          <Footer />
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
