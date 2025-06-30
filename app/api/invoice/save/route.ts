import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { InvoiceItem } from "@/app/store/invoiceSlice";

export async function POST(req: Request) {
  console.log("Entered Post");
  
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
    const company = await prisma.companyDetails.create({
      data: body.CompanyDetails,
    });

    const client = await prisma.clientDetails.create({
      data: body.ClientDetails,
    });

    const invoiceDetails = await prisma.invoiceDetails.create({
      data: {
        ...body.InvoiceDetails,
        invoiceDate: new Date(body.InvoiceDetails.invoiceDate),
        dueDate: new Date(body.InvoiceDetails.dueDate),
        billingDetails: body.InvoiceDetails.billingDetails
      ? {
          create: body.InvoiceDetails.billingDetails,
        }
      : undefined,
      },
    });

    const additionalInfo = await prisma.additionalInformation.create({
      data: body.AdditionalInformation,
    });

    const invoice = await prisma.invoice.create({
      data: {
        userId: user.id,
        invoiceNumber: body.InvoiceSerial.invoiceNumber,
        invoicePrefix: body.InvoiceSerial.invoicePrefix,
        companyDetailsId: company.id,
        clientDetailsId: client.id,
        invoiceDetailsId: invoiceDetails.id,
        additionalInformationId: additionalInfo.id,
        invoiceItems: {
          create: (body.InvoiceItems as InvoiceItem[]).map(({ id, ...item }) => item),
        },
      },
    });
    
    return NextResponse.json({ id: invoice.id }, { status: 201 });
  } catch (err) {
    console.error("❌ Failed to save invoice:", err);
    return NextResponse.json(
      { error: "Failed to save invoice" },
      { status: 500 }
    );
  }
}
