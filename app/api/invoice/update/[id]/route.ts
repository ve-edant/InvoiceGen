//api/invoice/update/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { InvoiceItem } from "@/app/store/invoiceSlice";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const invoiceId = params.id;
  
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await req.json();

  try {
    // First, fetch the existing invoice with relational IDs
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Update related models
    await prisma.companyDetails.update({
      where: { id: existingInvoice.companyDetailsId! },
      data: body.CompanyDetails,
    });

    await prisma.clientDetails.update({
      where: { id: existingInvoice.clientDetailsId! },
      data: body.ClientDetails,
    });

    await prisma.invoiceDetails.update({
      where: { id: existingInvoice.invoiceDetailsId! },
      data: {
        ...body.InvoiceDetails,
        invoiceDate: new Date(body.InvoiceDetails.invoiceDate),
        dueDate: new Date(body.InvoiceDetails.dueDate),
        billingDetails: body.InvoiceDetails.billingDetails
          ? {
              deleteMany: {}, // delete existing
              create: body.InvoiceDetails.billingDetails, // create new
            }
          : undefined,
      },
    });

    await prisma.additionalInformation.update({
      where: { id: existingInvoice.additionalInformationId! },
      data: body.AdditionalInformation,
    });

    // Delete existing items and recreate them
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: invoiceId },
    });

    await prisma.invoice.update({
  where: { id: invoiceId },
  data: {
    invoicePrefix: body.InvoiceSerial.invoicePrefix,
    invoiceNumber: body.InvoiceSerial.invoiceNumber,
    invoiceItems: {
      create: (body.InvoiceItems as InvoiceItem[]).map(({ ...item }) => item),
    },
  },
});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ PUT /invoice/update/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update Invoice" },
      { status: 500 }
    );
  }
}
