import Image from "next/image";

// Define the props the component will accept
type ShopCardProps = {
  imageUrl: string;
  name: string;
  discountInfo: string;
  deliveryTime: string;
};

export default function ShopCard({
  imageUrl,
  name,
  discountInfo,
  deliveryTime,
}: ShopCardProps) {
  return (
    <div className="shrink-0 w-36 mr-3">
      {/* Image container with rounded corners */}
      <div className="relative w-36 h-36">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover" // Use 'cover' to fill the container
          className="rounded-xl"
        />
      </div>

      {/* Text Content */}
      <div className="mt-2">
        <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
        {/* Use your Orange for discount text */}
        <p className="text-sm text-[#ff665e] truncate">{discountInfo}</p>
        <p className="text-sm text-gray-500">{deliveryTime}</p>
      </div>
    </div>
  );
}