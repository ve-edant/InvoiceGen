import { InvoiceTable } from "./invoice-edit/[id]/InvoiceTable";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login"); // Redirect if not authenticated
  }

  return (
    <main className="p-4 md:p-8">
      <InvoiceTable />
    </main>
  );
}
