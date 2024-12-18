"use client";

import { useState } from "react";
import "./globals.css";
import Sidebar from "./comp/sidebar";
import Header from "./comp/header";

export default function RootLayout({ children }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <html lang="en">
      <body>
        <div className="flex items-start">
          <Sidebar isVisible={isSidebarVisible} />

          <div className="w-full md:pl-52 lg:pl-64 flex flex-col min-h-screen">
            <Header onToggleSidebar={toggleSidebar} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
