// invoiceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface InvoiceItem {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  rate: number;
}

interface BillingDetails {
  label: string;
  value: number;
  type: "Fixed" | "Percentage";
}

interface InvoiceState {
  InvoiceSerial: {
    invoiceNumber: number;
    invoicePrefix: string;
  };
  CompanyDetails: {
    companyName: string;
    companyEmail: string;
    companyAddress: string;
    companyLogo: string; // Placeholder for company logo
    companySignature: string; // Placeholder for company signature
  };
  ClientDetails: {
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientPhone: string;
  };
  InvoiceDetails: {
    currency: string;
    themeColor: string;
    invoiceDate: string;
    dueDate: string;
    paymentTerms: string;
    billingDetails: BillingDetails[];
  };
  InvoiceItems: InvoiceItem[];
  AdditionalInformation: {
    notes: string;
  };
}

const initialState: InvoiceState = {
  InvoiceSerial: {
    invoicePrefix: "INV",
    invoiceNumber: 101,
  },
  CompanyDetails: {
    companyName: "Acme Corp",
    companyEmail: "contact@acme.com",
    companyAddress: "123 Industrial Street, Metropolis, NY 10001",
    companyLogo: "https://placehold.co/150x80/e0e0e0/000000?text=Company+Logo",
    companySignature:
      "https://placehold.co/100x40/e0e0e0/000000?text=Signature",
  },
  ClientDetails: {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    clientAddress: "456 Client Road, Gotham, NJ 07001",
    clientPhone: "+1 (555) 123-4567",
  },
  InvoiceDetails: {
    currency: "USD",
    themeColor: "#2563eb",
    invoiceDate: new Date().toISOString(), // today's date
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days later
    paymentTerms: "Net 7",
    billingDetails: [
      { label: "Tax", value: 10, type: "Percentage" },
      { label: "Discount", value: 20, type: "Fixed" },
    ],
  },
  InvoiceItems: [
    {
      id: uuid(),
      itemName: "Preview Item 1",
      description: "Description Item 1",
      quantity: 1,
      rate: 1500,
    },
  ],
  AdditionalInformation: {
    notes: "Thank you for your business!",
  },
};

interface UpdateInvoiceItemPayload {
  id: string;
  field: keyof Omit<InvoiceItem, "id">;
  value: InvoiceItem[keyof Omit<InvoiceItem, "id">];
}

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    updateInvoiceSerial: (
      state,
      action: PayloadAction<Partial<InvoiceState["InvoiceSerial"]>>
    ) => {
      state.InvoiceSerial = { ...state.InvoiceSerial, ...action.payload };
    },
    updateCompanyDetails: (
      state,
      action: PayloadAction<Partial<InvoiceState["CompanyDetails"]>>
    ) => {
      state.CompanyDetails = { ...state.CompanyDetails, ...action.payload };
    },
    updateClientDetails: (
      state,
      action: PayloadAction<Partial<InvoiceState["ClientDetails"]>>
    ) => {
      state.ClientDetails = { ...state.ClientDetails, ...action.payload };
    },
    updateInvoiceDetails: (
      state,
      action: PayloadAction<Partial<InvoiceState["InvoiceDetails"]>>
    ) => {
      state.InvoiceDetails = { ...state.InvoiceDetails, ...action.payload };
    },
    addInvoiceItem: (state, action: PayloadAction<InvoiceItem>) => {
      state.InvoiceItems.push(action.payload);
    },
    removeInvoiceItem: (state, action: PayloadAction<string>) => {
      state.InvoiceItems = state.InvoiceItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateInvoiceItem: (
      state,
      action: PayloadAction<UpdateInvoiceItemPayload>
    ) => {
      const { id, field, value } = action.payload;
      const item = state.InvoiceItems.find((item) => item.id === id);
      if (item) {
        (item as any)[field] = value;
      }
    },
    setInvoiceItems: (state, action: PayloadAction<InvoiceItem[]>) => {
      state.InvoiceItems = action.payload;
    },
    updateAdditionalInformation: (
      state,
      action: PayloadAction<Partial<InvoiceState["AdditionalInformation"]>>
    ) => {
      state.AdditionalInformation = {
        ...state.AdditionalInformation,
        ...action.payload,
      };
    },
    resetInvoice: () => initialState,
  },
});

export const {
  updateInvoiceSerial,
  updateCompanyDetails,
  updateClientDetails,
  updateInvoiceDetails,
  addInvoiceItem,
  removeInvoiceItem,
  updateInvoiceItem,
  setInvoiceItems,
  updateAdditionalInformation,
  resetInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
