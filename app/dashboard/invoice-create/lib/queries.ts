import { prisma } from "@/app/lib/prisma";


export async function getInvoiceById(invoiceId: string) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        companyDetails: true,
        clientDetails: true,
        invoiceDetails: {
            include: {
            billingDetails: true,
          },
        },
        additionalInformation: true,
        invoiceItems: true,
      },
    });

    if (!invoice) return null;
    const cleanedItems = invoice.invoiceItems.map(({ invoiceId, ...item }) => item);
    const cleanedBillingItems = invoice.invoiceDetails?.billingDetails.map(({ invoiceDetailsId, ...item }) => item)
    // Optional: Structure data to match your Redux shape
    return {
      id: invoice.id,
      invoicePrefix: invoice.invoicePrefix,
      invoiceNumber: invoice.invoiceNumber,
      companyDetails: invoice.companyDetails,
      clientDetails: invoice.clientDetails,
      invoiceDetails: {
        ...invoice.invoiceDetails,
        billingDetails: cleanedBillingItems || [],
      },
      additionalInformation: invoice.additionalInformation,
      invoiceItems: cleanedItems,
    };
  } catch (error) {
    console.error("❌ getInvoiceById error:", error);
    return null;
  }
}
