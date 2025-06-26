import { InvoiceSchema } from "../../../schemas/invoiceSchema";

export const sanitizeInvoiceData = (data: InvoiceSchema): InvoiceSchema => {
  return {
    ...data,
    CompanyDetails: {
      ...data.CompanyDetails,
      companyLogo: data.CompanyDetails.companyLogo || "",
      companySignature: data.CompanyDetails.companySignature || "",
    },
    InvoiceItems: data.InvoiceItems.map((item) => ({
      ...item,
      quantity: Number(item.quantity) || 0,
      rate: Number(item.rate) || 0,
    })),
    InvoiceDetails: {
      ...data.InvoiceDetails,
      billingDetails: data.InvoiceDetails.billingDetails.map((f) => ({
        ...f,
        value: Number(f.value) || 0,
      })),
    },
  };
};
