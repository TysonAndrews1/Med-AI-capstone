import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediHealth Ai",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="h-screen flex flex-col bg-white"
      >
        <Header />
        <div className="flex flex-row flex-grow h-full">
          <Navbar />
          <main className="flex-grow flex min-h-screen justify-center">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
