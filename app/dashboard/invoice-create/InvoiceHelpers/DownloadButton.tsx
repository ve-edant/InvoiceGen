"use client";

import { useEffect, useRef, useState } from "react";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { BiSolidSave } from "react-icons/bi";
import { RiFileDownloadFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";

interface Props {
  blobUrl: string | null;
  invoiceId?: string; // Optional for edit page.
}
export const DownloadButton = ({ blobUrl, invoiceId }: Props) => {
  const router = useRouter();
  const invoiceState = useSelector((state: RootState) => state.invoice);

  const handleSave = async () => {
    const method = invoiceId ? "PUT" : "POST";
    const url = invoiceId
      ? `/api/invoice/update/${invoiceId}`
      : "/api/invoice/save";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceState),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Error saving invoice:", result.error);
    } else {
      // If new, redirect to edit page
      if (!invoiceId) {
        router.push(`/dashboard/invoice-edit/${result.id}`);
      } else {
        // Optional: show a toast like "Updated successfully!"
        console.log("✅ Invoice updated");
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAction = (action: string) => {
    if (!blobUrl) return;

    switch (action) {
      case "view":
        window.open(blobUrl, "_blank");
        break;
      case "download":
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "invoice.pdf";
        a.click();
        break;
    }

    setIsOpen(false);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!blobUrl) return <button disabled>Preparing PDF...</button>;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border px-3 py-1.5 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Download ▼
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 right-0 bg-white border border-gray-200 rounded shadow-lg z-50">
          <button
            onClick={() => handleAction("view")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
          >
            <HiMiniViewfinderCircle className="text-blue-500" />
            View PDF
          </button>
          <button
            onClick={() => handleAction("download")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
          >
            <BiSolidSave className="text-green-600" />
            Download PDF
          </button>
          <button
            onClick={() => handleSave()}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
          >
            <RiFileDownloadFill className="text-yellow-500" />
            Save Invoice
          </button>
        </div>
      )}
    </div>
  );
};
