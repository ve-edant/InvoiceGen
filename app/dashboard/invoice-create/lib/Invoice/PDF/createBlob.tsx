// createBlobPDF.ts
import { pdf } from '@react-pdf/renderer';
import InvoiceDocument from '@/app/dashboard/invoice-create/Components/InvoiceDocument';
import { InvoiceSchema } from '@/app/schemas/invoiceSchema';

export const createBlob = async (data: InvoiceSchema): Promise<Blob> => {
  const doc = <InvoiceDocument data={data} />;
  const blob = await pdf(doc).toBlob();
  return blob;
};
