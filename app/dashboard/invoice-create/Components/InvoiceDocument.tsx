import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import { InvoiceSchema } from "@/app/schemas/invoiceSchema";
import getSymbolFromCurrency from 'currency-symbol-map'
import { formatCurrencyText } from "../InvoiceHelpers/CurrenySelect";

interface Props {
  data: InvoiceSchema;
}

const InvoiceDocument: React.FC<Props> = ({ data }) => {
  const {
    CompanyDetails,
    ClientDetails,
    InvoiceDetails,
    InvoiceItems,
    AdditionalInformation,
  } = data;

  const colors = {
    primary: InvoiceDetails.themeColor || "#000",
    secondary: "#F0F0F0",
  };

  const subtotal = (InvoiceItems ?? []).reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  const calculateBillingAdjustment = (
    field: (typeof InvoiceDetails.billingDetails)[0]
  ) => {
    if (field.type === "Fixed") return field.value;
    if (field.type === "Percentage") return (field.value / 100) * subtotal;
    return 0;
  };

  const totalAdjustments = (InvoiceDetails.billingDetails ?? []).reduce(
    (sum, field) => sum + calculateBillingAdjustment(field),
    0
  );

  const grandTotal = subtotal + totalAdjustments;

  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 10,
      fontFamily: "Helvetica",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    heading: {
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 6,
      color: "#333",
    },
    section: {
      marginBottom: 10,
    },
    tableSection: {
      border: "1 solid #000000",
      backgroundColor: colors.secondary,
      borderRadius: "0.625rem",
      marginBottom: 10,
    },
    billingSection: {
      justifyContent: "space-between",
      gap: 10,
      flexDirection: "row",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    infoRow: { width: "50%", flexDirection: "row", flexFlow: "flex-start" },
    infoHeading: {
      width: "50%",
      fontSize: 10,
      fontWeight: "bold",
      color: "#333",
    },
    tableHeader: {
      flexDirection: "row",
      borderBottom: "1 solid #000",
      backgroundColor: colors.primary,
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
      padding: "4px",
      fontWeight: "bold",
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "0.5 solid #ccc",
      paddingVertical: 4,
    },
    tableCell: {
      padding: 4,
      fontSize: 10,
      flex: 2,
    },
    tableFirstCell: {
      width: "50%",
      padding: 4,
      fontSize: 10,
    },
    tableSecondCell: {
      textAlign: "center",
      width: "10%",
      padding: 4,
      fontSize: 10,
    },
    tableLastCell: {
      textAlign: "right",
      width: "20%",
      padding: 4,
      fontSize: 10,
    },
    rightInfoCell: {
      width: "50%",
      fontSize: 10,
      flex: 1,
      textAlign: "left",
    },
    rightAlignedCell: {
      padding: 4,
      fontSize: 10,
      flex: 1,
      textAlign: "right",
    },
    bold: {
      fontWeight: "bold",
    },
    signatureBlock: {
      width: "50%",
      flexDirection: "row",
      border: "1 solid #000",
      display: "flex",
      alignItems: "center",
    },
    signatureCell: {
      width: "50%",
      height: 130,
      borderRight: "1 solid #000",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    signatureCellRight: {
      width: "50%",
      height: 130,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    signatureLabel: {
      width: "100%",
      backgroundColor: colors.primary,
      fontSize: 10,
      textAlign: "center",
      paddingVertical: 4,
    },
    spacer: {
      flexGrow: 1,
    },
    bottomSectionWrapper: {
        // This value might need tweaking based on actual content height
        minPresenceAhead: 400,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text
            style={{
              fontSize: 20,
              color: InvoiceDetails.themeColor,
              fontWeight: "bold",
            }}
          >
            Invoice {InvoiceDetails.invoicePrefix}-{InvoiceDetails.serialNumber}
          </Text>
        </View>

        {/* Info Row */}
        <View style={[styles.section, styles.row]}>
          <View style={{ flex: "auto", gap: "6", width: "70%" }}>
            <View style={styles.infoRow}>
              <Text style={{ ...styles.infoHeading }}>Serial Number:</Text>
              <Text style={{ ...styles.rightInfoCell }}>
                {InvoiceDetails.serialNumber}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={{ ...styles.infoHeading }}>Date:</Text>
              <Text style={{ ...styles.rightInfoCell }}>
                {InvoiceDetails.invoiceDate}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={{ ...styles.infoHeading }}>Due Date:</Text>
              <Text style={{ ...styles.rightInfoCell }}>
                {InvoiceDetails.dueDate}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={{ ...styles.infoHeading }}>Currency:</Text>
              <Text style={{ ...styles.rightInfoCell }}>
                {InvoiceDetails.currency} ( {getSymbolFromCurrency(InvoiceDetails.currency) } )
              </Text>
              
            </View>
          </View>

          {CompanyDetails.companyLogo &&
            typeof CompanyDetails.companyLogo === "string" && (
              <Image
                style={{ width: 80, height: 80, objectFit: "contain" }}
                src={CompanyDetails.companyLogo}
              />
            )}
        </View>

        {/* Parties */}
        <View
          style={{
            ...styles.section,
            flexDirection: "row",
            width: "100%",
            gap: 10,
          }}
        >
          <View
            style={{
              width: "50%",
              flex: 1,
              flexDirection: "column",
              gap: 4,
              borderRadius: "0.5rem",
              backgroundColor: colors.secondary,
              padding: 6,
            }}
          >
            <Text style={{ ...styles.heading, color: colors.primary }}>
              Billed By
            </Text>
            <View style={{ flex: "auto", gap: "4", color: "#000000" }}>
              <Text>{CompanyDetails.companyName}</Text>
              <Text><Link href={`mailto:${CompanyDetails.companyEmail}`}>{CompanyDetails.companyEmail}</Link></Text>
              <Text>{CompanyDetails.companyAddress}</Text>
            </View>
          </View>
          <View
            style={{
              width: "50%",
              flex: 1,
              flexDirection: "column",
              gap: 4,
              borderRadius: "0.5rem",
              backgroundColor: colors.secondary,
              padding: 6,
            }}
          >
            <Text style={{ ...styles.heading, color: colors.primary }}>
              Billed To
            </Text>
            <View style={{ flex: "auto", gap: "4" }}>
              <Text>{ClientDetails.clientName}</Text>
              <Link href={`mailto:${ClientDetails.clientEmail}`}>{ClientDetails.clientEmail}</Link>
              <Text>{ClientDetails.clientAddress}</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableFirstCell}>Item</Text>
            <Text style={styles.tableSecondCell}>Qty</Text>
            <Text style={styles.tableLastCell}>Rate</Text>
            <Text style={styles.tableLastCell}>Total</Text>
          </View>

          <View style={{ padding: 4 }}>
            {(InvoiceItems ?? []).map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.tableFirstCell}>{item.itemName}</Text>
                <Text style={styles.tableSecondCell}>{item.quantity}</Text>
                <Text style={styles.tableLastCell}>
                  {formatCurrencyText(InvoiceDetails.currency, item.rate)}
                </Text>
                <Text style={styles.tableLastCell}>
                  {formatCurrencyText(
                    InvoiceDetails.currency,
                    item.quantity * item.rate
                  )}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* --- Spacer to push content to bottom --- */}
        <View style={styles.spacer} />
        {/* --- End Spacer --- */}

        {/* --- Wrapper for all bottom sections with minPresenceAhead --- */}
        <View style={styles.bottomSectionWrapper}>
          {/* Billing Section (now at the bottom) */}
          <View style={[styles.billingSection, styles.row, styles.section]}>
            <View style={{ width: "50%", height: "100%", borderRadius: "1rem", padding: 6, backgroundColor: colors.secondary }}>
              <Text style={styles.heading}>Payment Terms</Text>
              <Text>{InvoiceDetails.paymentTerms}</Text>
              <Text style={{ marginTop: 5 }}>{AdditionalInformation.notes}</Text>
            </View>
            <View
              style={{
                width: "50%",
                borderRadius: "0.5rem",
              }}
            >
              <View
                style={{
                  ...styles.tableRow,
                  height: "auto",
                  backgroundColor: colors.secondary,
                  paddingHorizontal: 6,
                }}
              >
                <Text style={styles.tableCell}>Subtotal</Text>
                <Text style={styles.rightAlignedCell}>
                  {formatCurrencyText(InvoiceDetails.currency, subtotal)}
                </Text>
              </View>

              {(InvoiceDetails.billingDetails ?? []).map((field, i) => (
                <View
                  key={i}
                  style={{
                    ...styles.tableRow,
                    backgroundColor: colors.secondary,
                    paddingHorizontal: 6,
                  }}
                >
                  <Text style={styles.tableCell}>{field.label}</Text>
                  <Text style={styles.rightAlignedCell}>
                    {formatCurrencyText(
                      InvoiceDetails.currency,
                      calculateBillingAdjustment(field)
                    )}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  ...styles.tableRow,
                  paddingHorizontal: 6,
                  backgroundColor: colors.primary,
                  color: "#000",
                  borderRadius: "0.5rem",
                }}
              >
                <Text style={{ ...styles.tableCell, fontWeight: "900" }}>
                  Grand Total
                </Text>
                <Text style={[styles.rightAlignedCell, styles.bold]}>
                  {formatCurrencyText(InvoiceDetails.currency, grandTotal)}
                </Text>
              </View>
            </View>
          </View>

          {/* Totals / Signature Block */}
          <View
            style={{
              ...styles.section,
              ...styles.row,
              marginTop: 5,
              gap: 10,
            }}
          >
            <View style={{ width: "50%", height: "100%", borderRadius: "1rem", padding: 6, backgroundColor: colors.secondary }}>
              <Text style={styles.heading}>Bank Details:</Text>
            </View>
            <View style={styles.signatureBlock}>
              {/* Left: Received By */}
              <View style={styles.signatureCell}>
                <View style={{ width: 120, height: 60, alignSelf: "center" }} />
                <Text style={styles.signatureLabel}>Received By (Signature)</Text>
              </View>
              {/* Right: Authorized Signature */}
              <View style={styles.signatureCellRight}>
                {CompanyDetails.companySignature &&
                  typeof CompanyDetails.companySignature === "string" && (
                    <>
                      <Image
                        src={CompanyDetails.companySignature}
                        style={{
                          width: "90%",
                          height: "80%",
                          paddingVertical: 2,
                          objectFit: "contain",
                          alignSelf: "center",
                        }}
                      />
                      <Text style={styles.signatureLabel}>Authorized Signature</Text>
                    </>
                  )}
              </View>
            </View>
          </View>
        </View>
        {/* --- End Wrapper for all bottom sections --- */}
      </Page>
    </Document>
  );
};

export default InvoiceDocument;