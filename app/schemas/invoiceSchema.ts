import { z } from "zod";

const invoiceSerial = z.object({
  invoiceNumber: z.number().nonnegative("Serial Number should be non-negative").min(1, "Serial Number required"),
  invoicePrefix: z.string().min(1, "Invoice Prefix Required")
});

// BillingField Schema
const billingFieldSchema = z.object({
  label: z.string().min(1, "Billing label is required"),
  value: z.number().nonnegative("Value must be non-negative"),
  type: z.enum(["Fixed", "Percentage"]),
});

// InvoiceItem Schema
const invoiceItemSchema = z.object({
  id: z.string().uuid("Invalid item ID"),
  itemName: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  rate: z.number().nonnegative("Rate must be non-negative"),
});

// CompanyDetails Schema
const companyDetailsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z.string().email("Invalid company email").optional(),
  companyAddress: z.string().min(1, "Company address is required"),
  companyLogo: z.string().url("Invalid logo URL").optional(),
  companySignature: z.string().url("Invalid signature URL").optional(),
});

// ClientDetails Schema
const clientDetailsSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid client email").optional(),
  clientAddress: z.string().min(1, "Client address is required"),
  /* clientPhone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format"), */
});

// InvoiceDetails Schema
const invoiceDetailsSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  themeColor: z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color code"),
  invoiceDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "Invalid invoice date"
  ),
  dueDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "Invalid due date"
  ),
  paymentTerms: z.string(),
  billingDetails: z.array(billingFieldSchema),
});

// AdditionalInformation Schema
const additionalInformationSchema = z.object({
  notes: z.string().optional(),
});

// Final Invoice Schema
export const invoiceSchema = z.object({
  InvoiceSerial: invoiceSerial,
  CompanyDetails: companyDetailsSchema,
  ClientDetails: clientDetailsSchema,
  InvoiceDetails: invoiceDetailsSchema,
  InvoiceItems: z.array(invoiceItemSchema),
  AdditionalInformation: additionalInformationSchema,
});

// Inferred type
export type InvoiceSchema = z.infer<typeof invoiceSchema>;
