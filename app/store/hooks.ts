// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useEffect, useState } from 'react';
import { InvoiceSchema } from '@/app/schemas/invoiceSchema';
import { createBlob } from '@/app/dashboard/invoice-create/lib/Invoice/PDF/createBlob';
import debounce from 'lodash.debounce';

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useDebouncedInvoiceBlob with lodash.debounce
export const useDebouncedInvoiceBlob = (delay = 2000) => {
  const invoice = useAppSelector((state: RootState) => state.invoice) as InvoiceSchema;

  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateBlobUrl = async () => {
      try {
        const blob = await createBlob(invoice);
        const url = URL.createObjectURL(blob);

        setBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch (err) {
        console.error("Failed to generate blob:", err);
      }
    };

    // Create a debounced version of the function
    const debounced = debounce(generateBlobUrl, delay);

    // Call the debounced function
    debounced();

    return () => {
      debounced.cancel(); // Cancel any pending debounce on cleanup
    };
  }, [invoice, delay]);

  return blobUrl;
};
