// invoiceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InvoiceItem {
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
    invoicePrefix: string;
    serialNumber: string;
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
  CompanyDetails: {
    companyName: "Acme Corp",
    companyEmail: "contact@acme.com",
    companyAddress: "123 Industrial Street, Metropolis, NY 10001",
    companyLogo: "https://via.placeholder.com/150x80?text=Company+Logo",
    companySignature: "https://via.placeholder.com/100x40?text=Signature",
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
    invoicePrefix: "INV",
    serialNumber: "1001",
    invoiceDate: new Date().toISOString().split("T")[0], // today's date
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 days later
    paymentTerms: "Net 7",
    billingDetails: [
      { label: "Tax", value: 10, type: "Percentage" },
      { label: "Discount", value: 20, type: "Fixed" },
    ],
  },
  InvoiceItems: [
    {
      id: "item-1",
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
  updateCompanyDetails,
  updateClientDetails,
  updateInvoiceDetails,
  addInvoiceItem,
  removeInvoiceItem,
  updateInvoiceItem,
  updateAdditionalInformation,
  resetInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
