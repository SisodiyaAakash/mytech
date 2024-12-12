"use client";

import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/json/products.json");
        const data = await response.json();
        setProducts(data.products);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Product</title>
        <meta name="description" content="Product Listing of MyTech" />
      </Head>
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

        {/* Filter Area */}
        <div className="filter-area p-6"></div>

        {/* Product Listing Area */}
        <div className="product-listing bg-white rounded shadow p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b">
                  <input type="checkbox" />
                </th>
                <th className="p-3 border-b">SKU</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Stock</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Added</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 border-b">{product.details.sku}</td>
                  <td className="p-3 border-b">
                    {categories[product.categoryId]?.name}
                  </td>
                  <td className="p-3 border-b">{product.details.quantity}</td>
                  <td className="p-3 border-b">
                    ${product.details.basePrice.toFixed(2)}
                  </td>
                  <td className="p-3 border-b">{product.details.status}</td>
                  <td className="p-3 border-b">{product.details.addedDate}</td>
                  <td className="p-3 border-b">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-green-600 hover:underline">
                        View
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">Showing 1-10 from 100</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
                Previous
              </button>
              <button className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
