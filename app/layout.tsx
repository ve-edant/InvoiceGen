// app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./Providers";

export const metadata = {
  title: "Invoice Generator",
  description: "Generate professional invoices with ease.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        <Providers>
          {children}
          <div id="modal-root"></div>
        </Providers>
      </body>
    </html>
  );
}
