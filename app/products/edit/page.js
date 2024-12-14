"use client";

import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Product Name</title>
        <meta name="description" content="Product Name" />
      </Head>
      <div className="detail-page px-6">
        {/* Heading Area */}
        <div className="heading-area flex flex-wrap justify-between items-end gap-4">
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
              <a href="/products">Product List</a>
              <Image
                src="/icons/dropdown.svg"
                className="-rotate-90"
                alt=">"
                width={16}
                height={16}
              />
              <span className="text-[#667085]">Edit Product</span>
            </nav>
          </div>
          <div className="flex gap-4">
            <button className="group export-btn bg-transparent border- hover:bg-[#858D9D] text-[#858D9D] border-[#858D9D] hover:text-white">
              <Image
                src="/icons/close.svg"
                className="group-hover:brightness-[1000] duration-300"
                alt="Download Icon"
                width={20}
                height={20}
              />
              Cancel
            </button>
            <button className="add-product-btn bg-[#2086BF] text-white border border-[#2086BF] opacity-65 hover:opacity-100">
              <Image
                src="/icons/save.svg"
                className="brightness-[1000]"
                alt="Plus Icon"
                width={20}
                height={20}
              />
              Save Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
