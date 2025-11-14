import type { Metadata } from "next";
import BottomNavbar from "@/components/shared/navbar";
import LocationHeader from "@/components/shared/headerbar";

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
    <html lang="en">
      <body>
      <LocationHeader 
        addressLine1="Pasig City, Philippines"
        addressLine2="Metro Manila"
      />
        <main>
        {children}
        </main>
        <BottomNavbar/>
      </body>
    </html>
  );
}
