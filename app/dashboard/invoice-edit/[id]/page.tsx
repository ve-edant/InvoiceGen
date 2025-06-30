import { getInvoiceById } from "@/app/dashboard/invoice-create/lib/queries"; // your DB utility
import { notFound } from "next/navigation";
import EditInvoiceForm from "../../invoice-create/Components/EditInvoiceForm";

export default async function EditPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params; 
  const invoiceData = await getInvoiceById(resolvedParams.id);

  if (!invoiceData) return notFound();

  return <EditInvoiceForm initialData={invoiceData} />;
}
