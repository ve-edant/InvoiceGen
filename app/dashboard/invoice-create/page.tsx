//app/Dashboard/InvoiceCreate/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import MainWrapper from "../layout/MainWrapper";
import InvoiceForm from "./Components/InvoiceForm";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { DownloadButton } from "./InvoiceHelpers/DownloadButton";
import InvoiceBlobPreview from "./Components/InvoiceBlobPreview";
import { useDebouncedInvoiceBlob } from "@/app/store/hooks";

export default function InvoicePage() {
  const [view, setView] = useState<"Both" | "Form" | "Preview">("Form");
  const [hasMounted, setHasMounted] = useState(false);
  const blobUrl = useDebouncedInvoiceBlob(2000);
  const userChangedView = useRef(false); // Track if user manually changed view
  
  useEffect(() => {
    setHasMounted(true);
    if (window.innerWidth >= 768) {
      setView("Both");
    }
  }, []);

  // Handle resize, only if user hasn't changed view manually
  useEffect(() => {
    const handleResize = () => {
      if (!userChangedView.current) {
        if (window.innerWidth < 768) {
          setView("Form");
        } else {
          setView("Both");
        }
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!hasMounted) return null; // prevent SSR mismatch

  return (
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="h-10 shrink-0 flex items-center justify-between box-layout border-b bg-white z-10">
          <div className="h-[90%]">Error</div>
          <div className="flex gap-2 px-1">
            <select
              className="bg-zinc-200 text-black rounded-md px-2 py-1"
              value={view}
              onChange={(e) =>
                setView(e.target.value as "Both" | "Form" | "Preview")
              }
            >
              <option value="Both" className="hidden lg:block">
                Both
              </option>
              <option value="Form">Form</option>
              <option value="Preview">Preview</option>
            </select>
            <div className="h-[90%] flex items-center">
              <DownloadButton blobUrl={blobUrl} />
            </div>
          </div>
        </div>

        {/* Panel area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex gap-0 w-full">
            <PanelGroup
              direction="horizontal"
              className="flex-1 h-[calc(100vh-40px)] w-full"
            >
              {(view === "Both" || view === "Form") && (
                <Panel
                  defaultSize={50}
                  minSize={30}
                  className="overflow-y-auto"
                >
                  <div className="h-full text-black">
                    <InvoiceForm />
                  </div>
                </Panel>
              )}

              <PanelResizeHandle disabled />

              {(view === "Both" || view === "Preview") && (
                <Panel
                  defaultSize={50}
                  minSize={30}
                  className="overflow-y-auto"
                >
                  <div className="h-full">
                    <InvoiceBlobPreview blobUrl={blobUrl} />
                  </div>
                </Panel>
              )}
            </PanelGroup>
          </div>
        </div>
      </div>
  );
}
