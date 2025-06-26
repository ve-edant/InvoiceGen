import { updateClientDetails } from "@/app/store/invoiceSlice";
import { RootState } from "@/app/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ClientDetails = () => {
  const dispatch = useDispatch();
  const ClientDetails = useSelector(
    (state: RootState) => state.invoice.ClientDetails
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label
          htmlFor="client-name"
          className="mb-1 font-medium text-sm text-gray-700"
        >
          Client Name
        </label>
        <input
          type="text"
          id="client-name"
          value={ClientDetails.clientName}
          onChange={(e) => {
            dispatch(
              updateClientDetails({
                ...ClientDetails,
                clientName: e.target.value,
              })
            );
          }}
          className="border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="client-email"
          className="mb-1 font-medium text-sm text-gray-700"
        >
          Client Email
        </label>
        <input
          type="email"
          id="client-email"
          placeholder="john.doe@example.com (optional)"
          value={ClientDetails.clientEmail}
          onChange={(e) => {
            dispatch(
              updateClientDetails({
                ...ClientDetails,
                clientEmail: e.target.value,
              })
            );
          }}
          className="border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="client-address"
          className="mb-1 font-medium text-sm text-gray-700"
        >
          Client Address
        </label>
        <input
          type="text"
          id="client-address"
          value={ClientDetails.clientAddress}
          onChange={(e) => {
            dispatch(
              updateClientDetails({
                ...ClientDetails,
                clientAddress: e.target.value,
              })
            );
          }}
          className="border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
    </div>
  );
};

export default ClientDetails;
