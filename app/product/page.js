"use client";

import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [productStatus, setProductStatus] = useState({});
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [viewProduct, setViewProduct] = useState(null); // New state for the modal
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/json/products.json");
        const data = await response.json();
        setProducts(data.products);
        setCategories(data.categories);
        setProductStatus(data.productStatus);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, []);

  // Handle product selection
  const handleProductSelection = (productId) => {
    setSelectedProducts((prev) => {
      const newSelectedProducts = new Set(prev);
      if (newSelectedProducts.has(productId)) {
        newSelectedProducts.delete(productId);
      } else {
        newSelectedProducts.add(productId);
      }
      return newSelectedProducts;
    });
  };

  // Handle Select All
  const handleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map((product) => product.id)));
    }
  };

  // Function to export products as CSV
  const handleExport = () => {
    if (selectedProducts.size === 0) {
      alert("Please select at least one product to export.");
      return;
    }

    const csvData = [
      ["Product", "SKU", "Category", "Stock", "Price", "Status", "Added"],
      ...products
        .filter((product) => selectedProducts.has(product.id))
        .map((product) => [
          product.name,
          product.details.sku,
          categories[product.categoryId]?.name || "",
          product.details.quantity,
          product.details.basePrice.toFixed(2),
          productStatus[product.details.statusId]?.name || "",
          product.details.addedDate,
        ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Add Product Button
  const handleAddProduct = () => {
    router.push("/product/edit");
  };

  // Handle Edit Product
  const handleEditProduct = (id) => {
    router.push(`/product/edit?id=${id}`);
  };

  // Handle View Product (opens the modal)
  const handleViewProduct = (id) => {
    const product = products.find((product) => product.id === id);
    setViewProduct(product); // Set the product data to be shown in the modal
  };

  // Handle Delete Specific Product
  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  // Handle Delete Selected Products
  const handleDeleteSelected = () => {
    if (selectedProducts.size === 0) {
      alert("Please select products to delete.");
      return;
    }

    if (confirm("Are you sure you want to delete the selected products?")) {
      setProducts((prev) =>
        prev.filter((product) => !selectedProducts.has(product.id))
      );
      setSelectedProducts(new Set()); // Clear selected products after delete
    }
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setViewProduct(null); // Close the modal by resetting the product
  };

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
            <button
              className="group export-btn bg-[#EAF8FF] hover:bg-[#2086BF] text-[#2086BF] hover:text-white duration-500"
              onClick={handleExport}
            >
              <Image
                src="/icons/download.svg"
                className="group-hover:brightness-[1000] duration-300"
                alt="Download Icon"
                width={20}
                height={20}
              />
              Export
            </button>
            <button
              className="group add-product-btn bg-[#2086BF] hover:bg-transparent text-white hover:text-[#2086BF] border border-[#2086BF] duration-500"
              onClick={handleAddProduct}
            >
              <Image
                src="/icons/plus.svg"
                className="group-hover:brightness-100 duration-300 brightness-[1000]"
                alt="Plus Icon"
                width={20}
                height={20}
              />
              Add Product
            </button>

            {/* Delete Selected Button */}
            {selectedProducts.size > 1 && (
              <button
                className="delete-btn bg-[#EB3D4D] hover:bg-[#ab1423] text-white duration-500"
                onClick={handleDeleteSelected}
              >
                <Image
                  src="/icons/delete.svg"
                  className="brightness-[1000]"
                  alt="Delete Icon"
                  width={16}
                  height={16}
                />
                Delete Selected
              </button>
            )}
          </div>
        </div>

        {/* Filter Area */}
        <div className="filter-area p-6"></div>

        {/* Product Listing Area */}
        <div className="product-listing rounded-xl shadow-shadow2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="p-3 border-b">
                  <input
                    type="checkbox"
                    checked={selectedProducts.size === products.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-3 border-b">Product</th>
                <th className="p-3 border-b">SKU</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Stock</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Added</th>
                <th className="p-3 border-b text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`bg-white border-[#EAF8FF] ${
                    selectedProducts.has(product.id)
                      ? "bg-[#F9F9FC]"
                      : "hover:bg-[#F9F9FC]"
                  }`}
                >
                  <td className="p-3 border-b">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => handleProductSelection(product.id)}
                    />
                  </td>
                  <td className="p-3 border-b">{product.name}</td>
                  <td className="p-3 border-b">{product.details.sku}</td>
                  <td className="p-3 border-b">
                    {categories[product.categoryId]?.name}
                  </td>
                  <td className="p-3 border-b">{product.details.quantity}</td>
                  <td className="p-3 border-b">
                    ${product.details.basePrice.toFixed(2)}
                  </td>
                  <td className="p-3 border-b">
                    {productStatus[product.details.statusId]?.name}
                  </td>
                  <td className="p-3 border-b">{product.details.addedDate}</td>
                  <td className="p-3 border-b">
                    <div className="flex justify-end gap-2">
                      <button
                        className="group p-0"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Image
                          src="/icons/edit.svg"
                          className="group-hover:brightness-0 duration-500"
                          alt="Edit Icon"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button
                        className="group p-0"
                        onClick={() => handleViewProduct(product.id)}
                      >
                        <Image
                          src="/icons/view.svg"
                          className="group-hover:brightness-0 duration-500"
                          alt="View Icon"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button
                        className="group p-0"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Image
                          src="/icons/delete.svg"
                          className="group-hover:brightness-0 duration-500"
                          alt="Delete Icon"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Showing 1-{Math.min(10, products.length)} from {products.length}
            </span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
                <Image
                  src="/icons/previous.svg"
                  className="hover:brightness-0 duration-500"
                  alt="<"
                  width={16}
                  height={16}
                />
              </button>
              <button className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
                <Image
                  src="/icons/next.svg"
                  className="hover:brightness-0 duration-500"
                  alt=">"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Viewing Product */}
        {viewProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-50">
            <div className="bg-white rounded shadow-lg p-6 w-1/2">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div>
                <p>
                  <strong>Name:</strong> {viewProduct.name}
                </p>
                <p>
                  <strong>SKU:</strong> {viewProduct.details.sku}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {categories[viewProduct.categoryId]?.name}
                </p>
                <p>
                  <strong>Stock:</strong> {viewProduct.details.quantity}
                </p>
                <p>
                  <strong>Price:</strong> $
                  {viewProduct.details.basePrice.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {productStatus[viewProduct.details.statusId]?.name}
                </p>
                <p>
                  <strong>Added:</strong> {viewProduct.details.addedDate}
                </p>
              </div>
              <div className="mt-4">
                <button
                  className="bg-[#2086BF] hover:bg-transparent text-white hover:text-[#2086BF] border border-[#2086BF] duration-500"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
