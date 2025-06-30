import { Suspense } from "react";
import { InvoiceTable } from "./invoice-edit/InvoiceTable";

export default function DashboardPage() {
  return (
    <main className="p-4 md:p-8">
        <InvoiceTable />
    </main>
  );
}
