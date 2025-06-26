"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import PageHeader from "../invoice-create/lib/PageHeader";

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // On mount, detect if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    checkIsMobile(); // initial check
    window.addEventListener("resize", checkIsMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Set sidebar state based on mobile status
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="relative h-screen w-full flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main
        className={`transition-all duration-300 flex-1 p-2 w-full min-h-full ${
          !isMobile && isSidebarOpen ? "md:ml-0" : "md:ml-[-256px]"
        }`}
      >
        <section className="bg-white text-black rounded-xl shadow-md flex flex-col h-full overflow-hidden gap-0 border border-zinc-300">
          {/* Header */}
          <div className="top-0 flex items-center justify-start box-layout gap-4 h-12 shrink-0">
            <Menu
              className="h-5 w-5 cursor-pointer"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />

            {/* Slanted Divider */}
            <div className="h-6 w-px bg-zinc-400 rotate-[15deg]" />

            <h1 className="text-lg font-bold">Welcome, </h1>
          </div>

          <div className="flex-1 overflow-y-auto">{children}</div>
        </section>
      </main>
    </div>
  );
};

export default MainWrapper;
