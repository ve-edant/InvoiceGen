"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PageHeader() {
  const pathname = usePathname();
  

  const [title, setTitle] = useState("")

  if (pathname.includes("/dashboard")) {
    setTitle ("My Invoices");
  } else if (pathname.includes("/dashboard/invoice-create")) {
    setTitle("Invoice Generator");
  } else if (pathname.includes("/dashboard/manage-assets")) {
    setTitle("Manage Assets");
  }

  return <h1 className="text-lg font-bold">{title}</h1>;
}
