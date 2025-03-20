"use client"
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const hideHeader = ["/directoryHere", "/additional if needed"]; 
    const hideFooter = ["/directoryHere", "/additional if needed"]; 
    const hideSidebar = ["/directoryHere", "/additional if needed"]; 
  
      return (
          <div>
            {!hideHeader.includes(pathname) && <Header />}
            <div className="flex flex-row">
              {!hideSidebar.includes(pathname) &&<Navbar />}
              {children}
            </div>
            {!hideFooter.includes(pathname) && <Footer />}
          </div>
      );
  }