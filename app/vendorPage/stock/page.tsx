import StockTable from "@/components/shared/VendorSide/stock/stock";

export default function StockPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-16">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Stock Management</h1>
        <StockTable />
      </div>
    </div>
  );
}