// 📄 DownloadButton.tsx

import React from "react";

interface Props {
  blobUrl: string | null;
}

export const DownloadButton = ({ blobUrl }: Props) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!blobUrl) return;

    switch (value) {
      case "view":
        window.open(blobUrl, "_blank");
        break;
      case "download":
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "invoice.pdf";
        a.click();
        break;
      case "save":
        console.log("Save invoice (not implemented yet)");
        break;
    }

    // Reset selection to default
    e.target.value = "default";
  };

  if (!blobUrl) return <button disabled>Preparing PDF...</button>;

  return (
    <select
      name="DownloadOptions"
      defaultValue="default"
      onChange={handleSelectChange}
      className="border px-2 py-1 rounded"
    >
      <option value="default" disabled>Download</option>
      <option value="view">👁️ View PDF</option>
      <option value="download">⬇️ Download PDF</option>
      <option value="save">💾 Save Invoice</option>
    </select>
  );
};
