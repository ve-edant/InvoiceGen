import { RootState } from "@/app/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanyDetails } from "../../../store/invoiceSlice"; // Adjust as needed

const CompanyImageUpload = () => {
  const dispatch = useDispatch();
  const companyDetails = useSelector(
    (state: RootState) => state.invoice.CompanyDetails
  );

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "companyLogo" | "companySignature"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        updateCompanyDetails({
          ...companyDetails,
          [field]: reader.result as string,
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (field: "companyLogo" | "companySignature") => {
    dispatch(
      updateCompanyDetails({
        ...companyDetails,
        [field]: "",
      })
    );
  };

  return (
    <div className="flex flex-row gap-4 w-full">
      {/* Company Logo */}
      <div className="flex flex-col w-1/2">
        <label
          htmlFor="company-logo"
          className="mb-2 font-medium text-sm text-gray-700"
        >
          Company Logo
        </label>
        <div className="relative w-full aspect-square border border-gray-300 rounded-md overflow-hidden bg-gray-50">
          <input
            type="file"
            accept="image/*"
            id="company-logo"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={(e) => handleFileChange(e, "companyLogo")}
          />
          {companyDetails.companyLogo ? (
            <>
              <img
                src={companyDetails.companyLogo}
                alt="Company Logo"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("companyLogo")}
                className="absolute top-1 right-1 z-20 bg-white border border-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition"
                title="Remove"
              >
                &times;
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-500 z-0">
              Upload
            </div>
          )}
        </div>
      </div>

      {/* Company Signature */}
      <div className="flex flex-col w-1/2">
        <label
          htmlFor="company-signature"
          className="mb-2 font-medium text-sm text-gray-700"
        >
          Company Signature
        </label>
        <div className="relative w-full aspect-square border border-gray-300 rounded-md overflow-hidden bg-gray-50">
          <input
            type="file"
            accept="image/*"
            id="company-signature"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={(e) => handleFileChange(e, "companySignature")}
          />
          {companyDetails.companySignature ? (
            <>
              <img
                src={companyDetails.companySignature}
                alt="Company Signature"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("companySignature")}
                className="absolute top-1 right-1 z-20 bg-white border border-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition"
                title="Remove"
              >
                &times;
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-500 z-0">
              Upload
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyImageUpload;
