import StockTable from "@/components/shared/VendorSide/stock/stock";

export default function StockPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pb-16">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Stock Management</h1>
        <StockTable />
      </div>
    </div>
  );
}