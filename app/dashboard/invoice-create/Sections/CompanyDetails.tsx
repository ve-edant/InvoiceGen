import React from "react";
import CompanyImageUpload from "../InvoiceHelpers/CompanyImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateCompanyDetails } from "@/app/store/invoiceSlice";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const companyDetails = useSelector(
    (state: RootState) => state.invoice.CompanyDetails
  );
  return (
    <div className="flex flex-col gap-2 text-gray-800">
      <CompanyImageUpload />

      {/* Text Inputs */}
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col">
          <label
            htmlFor="company-name"
            className="mb-1 font-medium text-sm text-black"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company-name"
            className="border border-gray-300 rounded-md p-2 text-sm"
            value={companyDetails.companyName}
            onChange={(e) => {
              dispatch(
                updateCompanyDetails({
                  ...companyDetails,
                  companyName: e.target.value,
                })
              );
            }}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="company-email"
            className="mb-1 font-medium text-sm"
          >
            Company Email
          </label>
          <input
            type="email"
            id="company-email"
            placeholder="contact@acme.com (optional)"
            value={companyDetails.companyEmail}
            onChange={(e) => {
              dispatch(
                updateCompanyDetails({
                  ...companyDetails,
                  companyEmail: e.target.value,
                })
              );
            }}
            className="border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="company-address"
            className="mb-1 font-medium text-sm "
          >
            Company Address
          </label>
          <textarea
            id="company-address"
            value={companyDetails.companyAddress}
            onChange={(e) => {
              dispatch(
                updateCompanyDetails({
                  ...companyDetails,
                  companyAddress: e.target.value,
                })
              );
            }}
            className="border border-gray-300 rounded-md p-2 text-sm min-h-10 w-full resize-none overflow-y-auto overflow-x-hidden"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
