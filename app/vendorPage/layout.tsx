import type { Metadata } from "next";
import BottomNavbar from "@/components/shared/VendorSide/navbarVendor";
import LocationHeader from "@/components/shared/VendorSide/headerbarVendor";

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
      <div className="flex-1 h-screen ">
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
