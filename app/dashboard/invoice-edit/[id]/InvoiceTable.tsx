"use client";

import { useEffect, useState, Suspense } from "react";
import useSWR from "swr";
import { format } from "date-fns";
import { Button } from "@/app/Components/UI/Button";
import { Badge } from "@/app/Components/UI/badge";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/app/Components/UI/table";
import { v4 as uuidv4 } from "uuid";
import ViewButton from "../../invoice-create/Components/ViewButton";

const fetcher = (url: string) => fetch(url).then(res => res.json());

type InvoiceMini = {
  id: string,
  serial: string,
  clientName: string,
  totalAmount: number,
  currency: string,
  status: "pending" | "expired" | "refunded" | "success" | "error",
  createdAt: string,
  paidAt: string,
}

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Success: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
};

export function InvoiceTable() {
  const { data, isLoading } = useSWR("/api/invoice/list", fetcher);

  const formatCurrency = (value: number, currency: string) => {
    return `${currency === "INR" ? "₹" : "$"}${value}`;
  };

  if (isLoading) return <div className="p-4">Loading invoices...</div>;
  if (!Array.isArray(data)) return <div className="p-4 text-yellow-500">No invoices found or unauthorized.</div>;
  if (!data || data.length === 0) return <div className="p-4">No invoices found.</div>;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold">Invoice Dashboard</h1>
        <Button variant="outline">Filter (Coming Soon)</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial No</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Paid At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice: InvoiceMini) => (
            <TableRow key={uuidv4()}>
              <TableCell>{`${invoice.serial}`}</TableCell>
              <TableCell>{`${invoice.clientName}`}</TableCell>
              <TableCell>{formatCurrency(invoice.totalAmount, invoice.currency)}</TableCell>
              <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[invoice.status] || "bg-gray-100 text-gray-800"}`}>
                {invoice.status}
              </span>
              </TableCell>
              <TableCell>{format(new Date(invoice.createdAt), "PPpp")}</TableCell>
              <TableCell>
              {invoice.paidAt ? format(new Date(invoice.paidAt), "PPpp") : "Unpaid"}
              </TableCell>
              <TableCell>
              <ViewButton invoiceId={invoice.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
