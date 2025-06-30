"use client";

import { useEffect, useState, useRef } from "react";
import InvoiceForm from "../../invoice-create/Components/InvoiceForm";
import InvoiceBlobPreview from "../../invoice-create/Components/InvoiceBlobPreview";
import { useDebouncedInvoiceBlob } from "@/app/store/hooks";
import { DownloadButton } from "../../invoice-create/InvoiceHelpers/DownloadButton";
import {
  updateCompanyDetails,
  updateClientDetails,
  setInvoiceItems,
  updateInvoiceDetails,
  updateAdditionalInformation,
  updateInvoiceSerial,
} from "@/app/store/invoiceSlice";
import { useDispatch } from "react-redux";
import { PanelGroup, Panel } from "react-resizable-panels";

export default function EditInvoiceForm({ initialData }: { initialData: any }) {
  const dispatch = useDispatch();
  const [view, setView] = useState<"Both" | "Form" | "Preview">("Both");
  const blobUrl = useDebouncedInvoiceBlob(2000);
  const userChangedView = useRef(false);

  // Hydrate Redux
  useEffect(() => {
    dispatch(updateCompanyDetails(initialData.companyDetails));
    dispatch(updateClientDetails(initialData.clientDetails));
    dispatch(setInvoiceItems(initialData.invoiceItems));
    dispatch(
      updateInvoiceDetails({
        ...initialData.invoiceDetails,
        invoiceDate: new Date(initialData.invoiceDetails.invoiceDate)
          .toISOString(),
        dueDate: new Date(initialData.invoiceDetails.dueDate)
          .toISOString()
      })
    );
    dispatch(updateAdditionalInformation(initialData.additionalInformation));
    dispatch(
      updateInvoiceSerial({
        invoicePrefix: initialData.invoicePrefix,
        invoiceNumber: initialData.invoiceNumber,
      })
    );
  }, [initialData]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="h-10 shrink-0 flex items-center justify-between box-layout border-b bg-white z-10">
        <div>Edit Invoice</div>
        <div className="flex gap-2 px-1">
          <select
            className="bg-zinc-200 text-black rounded-md px-2 py-1"
            value={view}
            onChange={(e) =>
              setView(e.target.value as "Both" | "Form" | "Preview")
            }
          >
            <option value="Both">Both</option>
            <option value="Form">Form</option>
            <option value="Preview">Preview</option>
          </select>
          <DownloadButton blobUrl={blobUrl}  invoiceId={initialData.id}/>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex gap-0 w-full">
          <PanelGroup
            direction="horizontal"
            className="flex-1 h-[calc(100vh-40px)] w-full"
          >
            {(view === "Both" || view === "Form") && (
              <Panel defaultSize={50} minSize={30} className="overflow-y-auto">
                <div className="text-black">
                  <InvoiceForm />
                </div>
              </Panel>
            )}
            {(view === "Both" || view === "Preview") && (
              <Panel defaultSize={50} minSize={30} className="overflow-y-auto">
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
