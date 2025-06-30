type Item = {
  quantity: number;
  rate: number;
};

type BillingField = {
  label: string;
  value: number;
  type: "Fixed" | "Percentage";
};

export function subTotal(items: Item[]): number {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    return subtotal;
}

export function calculateInvoiceTotal(
  items: Item[],
  billingDetails?: BillingField[]
): number {
  const subtotal = subTotal(items)

  const totalAdjustments = (billingDetails ?? []).reduce((sum, field) => {
    if (field.type === "Percentage") return sum + (field.value / 100) * subtotal;
    if (field.type === "Fixed") return sum + field.value;
    return sum;
  }, 0);

  return subtotal + totalAdjustments;
}
