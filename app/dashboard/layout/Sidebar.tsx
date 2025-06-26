"use client";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      setShowBackdrop(true);
    } else {
      setShowBackdrop(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (window.innerWidth < 768) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      {showBackdrop && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`text-black fixed md:static top-0 left-0 h-screen bg-zinc-100 border-r border-zinc-300 z-30
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-[80%] sm:w-[70%] md:w-64
        `}
      >
        <div className="flex justify-end md:hidden p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm px-3 py-1 bg-zinc-300 rounded"
          >
            Close
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="p-4 space-y-2">
          <div className="text-xl font-bold">InvoiceGen</div>
          <div className="flex flex-col gap-2">
            <Link
              className="hover:bg-zinc-200 rounded px-2 py-1 cursor-pointer"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="hover:bg-zinc-200 rounded px-2 py-1 cursor-pointer"
              href="/dashboard/invoice-create"
            >
              Create Invoice
            </Link>
            <Link
              className="hover:bg-zinc-200 rounded px-2 py-1 cursor-pointer"
              href="/dashboard/manage-assets"
            >
              Manage Assets
            </Link>
          </div>
          <div>
            <button
              className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
