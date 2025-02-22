import { Pencil, TrashIcon } from "lucide-react";
import Image from "next/image";

interface CardProps {
  onClick?: () => void;
  onDelete: () => void;
  name: string;
  price: number;
  image: string;
  stock: number;
}
export default function Card({
  onClick,
  onDelete,
  name,
  price,
  image,
  stock,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className=" bg-white hover:cursor-pointer rounded-lg border border-neutral-300 overflow-hidden shadow-sm transition-all duration-150 "
    >
      <div className="aspect-square overflow-hidden ">
        <Image
          alt="Product Images"
          className="w-full h-full object-cover"
          src={image}
          width={1920}
          height={1080}
        />
      </div>
      <div className="p-4">
        <p className="line-clamp-1">{name}</p>
        <p className="font-semibold text-xl">{price}</p>
        <p className="mt-1 text-sm text-neutral-500 ">Stok Sisa: {stock}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={onClick}
            className="mt-4 rounded-lg text-blue-600 outline outline-blue-600 py-2 md:hover:bg-blue-100 flex items-center justify-center w-full"
          >
            <Pencil />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="mt-4 rounded-lg text-red-600 outline outline-red-600  p-2 md:hover:bg-red-100 w-full flex items-center justify-center"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
