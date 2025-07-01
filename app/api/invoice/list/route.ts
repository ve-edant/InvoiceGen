// app/api/invoice/list/route.ts
import { prisma } from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token || !token.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user from DB (you can cache this later)
    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Fetch only this user's invoices
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: user.id,
      },
      include: {
        invoiceItems: true,
        clientDetails: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const transformed = invoices.map((inv) => ({
      id: inv.id,
      userId: inv.userId,
      serial: `${inv.invoicePrefix}-${inv.invoiceNumber.toString().padStart(4, "0")}`,
      total: inv.invoiceItems.reduce((acc, item) => acc + item.quantity * item.rate, 0),
      clientName: inv.clientDetails?.clientName,
      itemsCount: inv.invoiceItems.length,
      status: "Pending",
      createdAt: inv.createdAt,
      paidAt: null,
      currency: "USD",
      storage: "Server",
    }));

    return NextResponse.json(transformed);
  } catch (err: any) {
    console.error("❌ Failed to fetch invoices:", err.message || err);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}
