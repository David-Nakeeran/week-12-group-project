import { Days_One, Mulish } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  weight: "variable",
  subsets: ["latin"],
});

const daysOne = Days_One({
  variable: "--font-days-one",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "GameVault",
  description: "Track, rate, and conquer your video game backlog",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${daysOne.variable} ${mulish.className} flex flex-col min-h-screen`}
        >
          <Header />
          <main className="flex-1"> {children}</main>
          <Toaster />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
