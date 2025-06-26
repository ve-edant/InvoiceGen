"use client";

import { useAppDispatch } from "@/app/store/hooks";
import { updateInvoiceDetails } from "@/app/store/invoiceSlice";
import { RootState, store } from "@/app/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CurrencySelect } from "../InvoiceHelpers/CurrenySelect";

const InvoiceDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const invoiceDetails = useSelector(
    (state: RootState) => state.invoice.InvoiceDetails
  );

  // Handle input changes for billing fields
  const handleBillingChange = (
    index: number,
    field: "label" | "value" | "type",
    newValue: string | number
  ) => {
    const updatedBillingDetails = [...invoiceDetails.billingDetails];
    updatedBillingDetails[index] = {
      ...updatedBillingDetails[index],
      [field]: field === "value" ? Number(newValue) : newValue,
    };

    dispatch(
      updateInvoiceDetails({
        ...invoiceDetails,
        billingDetails: updatedBillingDetails,
      })
    );
  };

  // Add a new billing field
  const addBillingField = () => {
    dispatch(
      updateInvoiceDetails({
        ...invoiceDetails,
        billingDetails: [
          ...invoiceDetails.billingDetails,
          { label: "", value: 0, type: "Fixed" },
        ],
      })
    );
  };

  // Delete a billing field by index
  const deleteBillingField = (index: number) => {
    const updatedBillingDetails = invoiceDetails.billingDetails.filter(
      (_, i) => i !== index
    );

    dispatch(
      updateInvoiceDetails({
        ...invoiceDetails,
        billingDetails: updatedBillingDetails,
      })
    );
    const currentItems = store.getState().invoice.InvoiceDetails.billingDetails;
    console.log("🧾 Remaining InvoiceItems after delete:", currentItems);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <label className="block text-sm font-medium mb-1">Currency</label>
          <CurrencySelect
            value={invoiceDetails.currency}
            onChange={(currencyCode) => {
              dispatch(
                updateInvoiceDetails({
                  ...invoiceDetails,
                  currency: currencyCode,
                })
              );
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Theme Color</label>
          <input
            type="color"
            className="w-full h-10 p-0 border border-gray-300 rounded"
            value={invoiceDetails.themeColor}
            onChange={(e) => {
              dispatch(
                updateInvoiceDetails({
                  ...invoiceDetails,
                  themeColor: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Invoice Prefix
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={invoiceDetails.invoicePrefix}
            onChange={(e) => {
              dispatch(
                updateInvoiceDetails({
                  ...invoiceDetails,
                  invoicePrefix: e.target.value,
                })
              );
            }}
            placeholder="e.g. INV"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Serial Number
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={invoiceDetails.serialNumber}
            onChange={(e) => {
              dispatch(
                updateInvoiceDetails({
                  ...invoiceDetails,
                  serialNumber: e.target.value,
                })
              );
            }}
            placeholder="e.g. 1001"
            min={0}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Invoice Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={invoiceDetails.invoiceDate}
            onChange={(e) => {
              dispatch(
                updateInvoiceDetails({
                  ...invoiceDetails,
                  invoiceDate: e.target.value,
                })
              );
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={invoiceDetails.dueDate}
            onChange={(e) => {
              dispatch(
                updateInvoiceDetails({
                  ...invoiceDetails,
                  dueDate: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>

      {/* Row 4 */}
      <div>
        <label className="block text-sm font-medium mb-1">Payment Terms</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={invoiceDetails.paymentTerms}
          onChange={(e) => {
            dispatch(
              updateInvoiceDetails({
                ...invoiceDetails,
                paymentTerms: e.target.value,
              })
            );
          }}
          placeholder="e.g. Net 30"
        />
      </div>

      {/* Row 5: Billing Details */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Billing Details</label>
          <button
            type="button"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            onClick={addBillingField}
          >
            Add Field
          </button>
        </div>
        <div className="space-y-3">
          {invoiceDetails.billingDetails.map((field, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                className="border rounded p-1 flex-1 w-3/7"
                placeholder="Label"
                value={field.label}
                onChange={(e) =>
                  handleBillingChange(idx, "label", e.target.value)
                }
              />
              <select
                className="border rounded p-1 w-1/7"
                value={field.type}
                onChange={(e) =>
                  handleBillingChange(idx, "type", e.target.value)
                }
              >
                <option value="Fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </select>
              <input
                type="number"
                className="border rounded p-1 flex-1 w-2/7"
                placeholder="Value"
                value={field.value}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  handleBillingChange(idx, "value", isNaN(value) ? 0 : value);
                }}
              />
              <button
                type="button"
                className="text-red-500 hover:bg-red-700 px-2 w-0.5/7 text-center"
                onClick={() => deleteBillingField(idx)}
                aria-label="Remove field"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
