import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/Components/UI/Accordion";
import CompanyDetails from "../Sections/CompanyDetails";
import ClientDetails from "../Sections/ClientDetails";
import InvoiceItems from "../Sections/InvoiceItems";
import AdditionalNotes from "../Sections/AdditionalNotes";
import InvoiceDetails from "../Sections/InvoiceDetails";

const InvoiceForm = () => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Company Details</AccordionTrigger>
          <AccordionContent>
            <CompanyDetails />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Client Details</AccordionTrigger>
          <AccordionContent>
            <ClientDetails />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Invoice Items</AccordionTrigger>
          <AccordionContent>
            <InvoiceItems />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Invoice Details</AccordionTrigger>
          <AccordionContent>
            <InvoiceDetails />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Additional Notes</AccordionTrigger>
          <AccordionContent>
            <AdditionalNotes />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InvoiceForm;
