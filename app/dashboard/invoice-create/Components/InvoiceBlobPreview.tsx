// components/InvoiceBlobPreview.tsx
'use client';

import dynamic from 'next/dynamic';

// Prevent SSR crash by dynamically importing
const InvoiceBlobPreview = dynamic(() => import('./InvoiceBlobPreviewInner'), {
  ssr: false,
});

export default InvoiceBlobPreview;
