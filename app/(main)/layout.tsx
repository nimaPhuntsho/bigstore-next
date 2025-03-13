import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/custom/Header";
import { QueryProvider } from "@/components/custom/QueryProvider";
import Footer from "@/components/custom/Footer";

export const metadata: Metadata = {
  title: "Bigstore",
  description: "A next app by Nima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <Provider>
            <Header />
            {children}
            <Footer />
          </Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
