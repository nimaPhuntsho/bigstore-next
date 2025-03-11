"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Exclude global layout for admin pages
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>Global Footer</footer>
    </>
  );
}
