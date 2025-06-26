
import { useAppDispatch } from "@/app/store/hooks";
import { updateAdditionalInformation } from "@/app/store/invoiceSlice";
import { RootState } from "@/app/store/store";
import React from "react";
import { useSelector } from "react-redux";

const AdditionalNotes = () => {
  const dispatch = useAppDispatch();
  const additionalNotes = useSelector((state: RootState) => state.invoice.AdditionalInformation);
  return (
    <div className="flex flex-col">
      <label
        htmlFor="invoice-notes"
        className="mb-1 font-medium text-sm text-gray-700"
      >
        Notes
      </label>
      <textarea
        id="invoice-notes"
        rows={4}
        value={additionalNotes.notes}
        onChange={(e)=>{
          dispatch(updateAdditionalInformation({...additionalNotes, notes: e.target.value}))
        }}
        className="border border-gray-300 rounded-md p-2 text-sm"
        placeholder="Enter any additional notes or terms here..."
      />
    </div>
  );
};

export default AdditionalNotes;
