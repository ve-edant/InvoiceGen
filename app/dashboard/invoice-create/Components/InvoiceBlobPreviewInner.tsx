'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF_VIEWER_PADDING = 12;

interface InvoiceBlobPreviewProps {
  blobUrl: string | null;
}

const InvoiceBlobPreview = ({ blobUrl }: InvoiceBlobPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full p-4 overflow-hidden"
    >
      {!blobUrl ? (
        <p className="text-center">Generating PDF preview...</p>
      ) : (
        <Document file={blobUrl} className="flex justify-center">
          <Page
            pageNumber={1}
            width={Math.min(width - PDF_VIEWER_PADDING, 600)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      )}
    </div>
  );
};

export default InvoiceBlobPreview;
