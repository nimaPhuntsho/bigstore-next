import { Metadata } from "next";
import Header from "./components/AdminHeader";
import { Provider } from "@/components/ui/provider";
import { QueryProvider } from "@/components/custom/QueryProvider";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin of bigstore",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <main>
            <QueryProvider>
              <Provider>
                <Header />
                {children}
              </Provider>
            </QueryProvider>
          </main>
        </body>
      </html>
    </>
  );
}
