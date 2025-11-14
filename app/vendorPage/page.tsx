import CustomerFeedback from "@/components/shared/VendorSide/home/feedback/feedback";
import OrdersComponent from "@/components/shared/VendorSide/home/orders/order";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pb-16">
      <OrdersComponent />
      <CustomerFeedback />
    </div>
  );
}
