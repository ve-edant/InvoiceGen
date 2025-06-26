"use client";

import React, { useState } from "react";
import ItemPopupModal from "../Modals/ItemPopupModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "@/app/store/store";
import { addInvoiceItem, removeInvoiceItem } from "@/app/store/invoiceSlice";
import { v4 as uuidv4 } from "uuid";

const InvoiceItems = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const invoiceItems = useSelector(
    (state: RootState) => state.invoice.InvoiceItems
  );

  const handleAddItem = (item: {
    itemName: string;
    description: string;
    quantity: number;
    rate: number;
  }) => {
    dispatch(
      addInvoiceItem({
        id: uuidv4(),
        ...item,
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    dispatch(removeInvoiceItem(id));
    
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        className="self-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setIsPopupOpen(true)}
      >
        + Add Item
      </button>

      {/* List of invoice items from Redux */}
      <div className="space-y-2">
        {invoiceItems.map((item, idx) => (
          <div
            key={item.id ?? idx}
            className="flex gap-4 border p-2 rounded shadow-sm bg-white"
          >
            <div className="w-1/3 font-medium">{item.itemName}</div>
            <div className="w-1/3 text-gray-600">{item.description}</div>
            <div className="w-1/6">Qty: {item.quantity}</div>
            <div className="w-1/6">Rate: ₹{item.rate.toFixed(2)}</div>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal for adding new item */}
      <ItemPopupModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddItem}
      />
    </div>
  );
};

export default InvoiceItems;
