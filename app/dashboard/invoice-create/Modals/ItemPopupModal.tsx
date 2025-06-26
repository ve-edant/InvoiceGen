"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ItemPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: {
    itemName: string;
    description: string;
    quantity: number;
    rate: number;
  }) => void;
}

const ItemPopupModal: React.FC<ItemPopupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [qty, setQty] = React.useState(1);
  const [rate, setRate] = React.useState(0);

  const handleSubmit = () => {
    if (!description) return;
    onSubmit({
      itemName: name,
      description,
      quantity: qty,
      rate,
    });
    setName("");
    setDescription("");
    setQty(1);
    setRate(0);
    onClose();
  };

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className="bg-white rounded p-6 w-96 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Add Invoice Item</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Item Name"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-row gap-2">
            <input
              type="number"
              placeholder="Quantity"
              className="w-1/2 border rounded px-3 py-2"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Rate"
              className="w-1/2 border rounded px-3 py-2"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ItemPopupModal;
