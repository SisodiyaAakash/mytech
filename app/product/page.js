import Image from "next/image";

export const metadata = {
  title: "Product",
  description: "Product Listing of MyTech",
};

export default function Product() {
  return (
    <div className="product-page px-6">
      {/* Heading Area */}
      <div className="heading-area flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Product</h1>
          <nav className="breadcrumb text-sm font-medium flex items-center gap-2">
            <a href="/">Dashboard</a>
            <Image
              src="/icons/dropdown.svg"
              className="-rotate-90"
              alt=">"
              width={16}
              height={16}
            />
            <span className="text-[#667085]">Product List</span>
          </nav>
        </div>
        <div className="flex gap-4">
          <button className="group export-btn bg-[#EAF8FF] hover:bg-[#2086BF] text-[#2086BF] hover:text-white duration-500">
            <Image
              src="/icons/download.svg"
              className="group-hover:brightness-[1000] duration-300"
              alt="Download Icon"
              width={20}
              height={20}
            />
            Export
          </button>
          <button className="group add-product-btn bg-[#2086BF] hover:bg-[#EAF8FF] text-white hover:text-[#2086BF] duration-500">
            <Image
              src="/icons/plus.svg"
              className="group-hover:brightness-100 duration-300 brightness-[1000]"
              alt="Plus Icon"
              width={20}
              height={20}
            />
            Add Product
          </button>
        </div>
      </div>

      {/* Product Listing Area */}
      <div></div>
    </div>
  );
}
