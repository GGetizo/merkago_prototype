import type { Metadata } from "next";
import BottomNavbar from "@/components/shared/CustomerSide/navbar";
import LocationHeader from "@/components/shared/CustomerSide/headerbar";

export const metadata: Metadata = {
  title: "MerkaGo",
  description: "In compliance for Technopreneurship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex-1 h-screen bg-white dark:bg-gray-900">
      <LocationHeader 
        addressLine1="Pasig City, Philippines"
        addressLine2="Metro Manila"
      />
        <main>
        {children}
        </main>
        <BottomNavbar/>
      </div>
  );
}
