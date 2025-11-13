import {
  Home,
  ShoppingCart,
  Receipt,
  User,
} from "lucide-react";

// This is a single navigation item component
// NO CHANGES are needed in this component
function NavItem({ icon, label, active = false }: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  // Use your brand's "Fresh Green" color for the active item
  const activeColor = active ? "text-[#7FC354]" : "text-gray-500";

  return (
    <a href="#" className="flex flex-col items-center justify-center flex-1 group">
      <div className={`text-2xl ${activeColor} group-hover:text-[#7FC354]`}>
        {icon}
      </div>
      <span className={`text-xs ${activeColor} group-hover:text-[#7FC354]`}>
        {label}
      </span>
    </a>
  );
}

// The main Navbar component
export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-[#FFFFFF] border-t border-gray-200">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {/*
          THE ONLY CHANGE IS HERE:
          We are using the imported lucide icons.
        */}
        <NavItem icon={<Home />} label="Home" active />
        <NavItem icon={<ShoppingCart />} label="Cart" />
        <NavItem icon={<Receipt />} label="Orders" />
        <NavItem icon={<User />} label="Profile" />
      </div>
    </nav>
  );
}