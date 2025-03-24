"use client"
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const hideHeader = ["/FindADoctor", "/additional if needed"]; 
    const hideFooter = ["/FindADoctor", "/additional if needed"]; 
    const hideSidebar = ["/FindADoctor", "/additional if needed"]; 
  
      return (
          <div>
            {!hideHeader.includes(pathname) && <Header />}
            {/* className="flex flex-row" */}
            
            {!hideSidebar.includes(pathname) &&<Navbar />}
              {children}
           
              
            
            {!hideFooter.includes(pathname) && <Footer />}
          </div>
      );
  }