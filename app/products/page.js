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
  const [viewProduct, setViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeStatus, setActiveStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
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

  useEffect(() => {
    let result = products;

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.details.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeStatus) {
      result = result.filter(
        (product) => product.details.statusId === activeStatus
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, activeStatus, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(
        new Set(filteredProducts.map((product) => product.id))
      );
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
      ...filteredProducts
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

  // Handle Search Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Status Filter
  const handleStatusFilter = (statusId) => {
    setActiveStatus(statusId === activeStatus ? null : statusId);
  };

  return (
    <>
      <Head>
        <title>Product</title>
        <meta name="description" content="Product Listing of MyTech" />
      </Head>
      <div className="product-page px-6">
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
              className="group add-product-btn bg-[#2086BF] hover:bg-transparent text-white hover:text-[#2086BF] border-[#2086BF] duration-500"
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
        <div className="filter-area py-6 flex flex-wrap items-center justify-between gap-4 w-full">
          <ul className="status-list rounded-lg border border-[#E0E2E7] p-1 flex items-center">
            <li
              className={`text-sm font-medium hover:bg-[#EAF8FF] hover:text-[#2086BF] px-3 py-1.5 cursor-pointer duration-500 ${
                !activeStatus
                  ? "bg-[#EAF8FF] text-[#2086BF]"
                  : "bg-transparent text-[#667085]"
              }`}
              onClick={() => handleStatusFilter(null)}
            >
              All Product
            </li>
            {Object.values(productStatus).map((status) => (
              <li
                className={`text-sm font-medium hover:bg-[#EAF8FF] hover:text-[#2086BF] px-3 py-1.5 cursor-pointer duration-500 ${
                  activeStatus === status.id
                    ? "bg-[#EAF8FF] text-[#2086BF]"
                    : "bg-transparent text-[#667085]"
                }`}
                key={status.id}
                onClick={() => handleStatusFilter(status.id)}
              >
                {status.name}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <label className="group w-52 flex items-center gap-1 px-3 py-2.5 rounded-lg border border-[#E0E2E7] bg-white">
              <Image
                src="/icons/search.svg"
                className="group-hover:brightness-0 duration-500 min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5"
                alt="Search Icon"
                width={20}
                height={20}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search product..."
                className="text-sm font-medium outline-0 bg-transparent flex-grow placeholder:text-[#858D9D]"
              />
            </label>
            <label className="group flex items-center gap-1 px-3 py-2.5 rounded-lg border border-[#E0E2E7] bg-white relative cursor-pointer">
              <Image
                src="/icons/calendar.svg"
                className="group-hover:brightness-0 duration-500 min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5"
                alt="Calendar Icon"
                width={20}
                height={20}
              />
              Select Date
              <input
                className="invisible absolute w-full h-full"
                id="datepicker"
                name="datepicker"
                type="date"
                placeholder="Select Dates"
              />
            </label>
            <label className="group flex items-center gap-1 px-3 py-2.5 rounded-lg border border-[#E0E2E7] bg-white relative cursor-pointer">
              <Image
                src="/icons/filter.svg"
                className="group-hover:brightness-0 duration-500 min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5"
                alt="Filter Icon"
                width={20}
                height={20}
              />
              Filters
            </label>
            <label className="group flex items-center gap-1 px-3 py-2.5 rounded-lg border border-[#E0E2E7] bg-white relative cursor-pointer">
              <Image
                src="/icons/column.svg"
                className="group-hover:brightness-0 duration-500 min-w-3.5 w-3.5 h-3.5 lg:min-w-3.5 lg:w-4 lg:h-4"
                alt="Column Icon"
                width={16}
                height={16}
              />
              Edit Column
            </label>
          </div>
        </div>
        {/* Product Listing Area */}
        <div className="product-listing rounded-xl shadow-shadow2 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white">
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                  <div className="flex items-center gap-2">
                    <input
                      className="min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5 rounded-md border-2 border-[#858D9D] outline-0"
                      type="checkbox"
                      checked={selectedProducts.size === products.length}
                      onChange={handleSelectAll}
                    />
                    Product
                  </div>
                </th>
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                  SKU
                </th>
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                  Category
                </th>
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                  Stock
                </th>
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                  Price
                </th>
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                  Status
                </th>
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                  Added
                </th>
                <th className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C] text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`bg-white border-[#EAF8FF] ${
                    selectedProducts.has(product.id)
                      ? "bg-[#F9F9FC]"
                      : "hover:bg-[#F9F9FC]"
                  }`}
                >
                  <td className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#1D1F2C]">
                    <div className="flex items-center gap-2">
                      <input
                        className="min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5 rounded-md border-2 border-[#858D9D] outline-0"
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => handleProductSelection(product.id)}
                      />
                      {product.media?.[0] ? (
                        <img
                          src={product.media?.[0]}
                          alt={product.name}
                          className="object-cover min-w-8 w-8 h-8 lg:min-w-11 lg:w-11 lg:h-11 rounded-lg"
                        />
                      ) : (
                        <div className="min-w-8 w-8 h-8 lg:min-w-11 lg:w-11 lg:h-11 rounded-lg bg-[#E0E2E7]"></div>
                      )}
                      <div className="flex flex-col gap-1">
                        {product.name}
                        <span className="text-xs font-normal text-[#667085]">
                          {product.variations?.length > 0
                            ? `${product.variations.length} ${
                                product.variations.length
                                  ? "Variant"
                                  : "Variants"
                              }`
                            : "No Variants"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#2086BF]">
                    {product.details.sku}
                  </td>
                  <td className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#667085]">
                    {categories[product.categoryId]?.name}
                  </td>
                  <td className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#667085]">
                    {product.details.quantity}
                  </td>
                  <td className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#667085]">
                    ${product.details.basePrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-[18px] border-b text-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-lg ${
                        productStatus[product.details.statusId]?.name ===
                        "Published"
                          ? "bg-[#E9FAF7] text-[#1A9882]"
                          : productStatus[product.details.statusId]?.name ===
                            "Draft"
                          ? "bg-[#F0F1F3] text-[#667085]"
                          : productStatus[product.details.statusId]?.name ===
                            "Low Stock"
                          ? "bg-[#FFF0EA] text-[#F86624]"
                          : productStatus[product.details.statusId]?.name ===
                            "Out of Stock"
                          ? "bg-[#FEECEE] text-[#EB3D4D]"
                          : "bg-black text-white"
                      }`}
                    >
                      {productStatus[product.details.statusId]?.name}
                    </span>
                  </td>
                  <td className="px-6 py-[18px] border-b text-nowrap text-sm font-medium text-[#667085]">
                    {new Date(product.details.addedDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-6 py-[18px] border-b text-nowrap">
                    <div className="flex justify-end gap-2">
                      <button
                        className="group p-0 border-0"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Image
                          src="/icons/edit.svg"
                          className="group-hover:brightness-0 duration-500 min-w-3.5 w-3.5 h-3.5 lg:min-w-4 lg:w-4 lg:h-4"
                          alt="Edit Icon"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button
                        className="group p-0 border-0"
                        onClick={() => handleViewProduct(product.id)}
                      >
                        <Image
                          src="/icons/view.svg"
                          className="group-hover:brightness-0 duration-500 min-w-3.5 w-3.5 h-3.5 lg:min-w-4 lg:w-4 lg:h-4"
                          alt="View Icon"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button
                        className="group p-0 border-0"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Image
                          src="/icons/delete.svg"
                          className="group-hover:brightness-0 duration-500 min-w-3.5 w-3.5 h-3.5 lg:min-w-4 lg:w-4 lg:h-4"
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
          <div className="flex justify-between items-center bg-white px-6 py-[18px]">
            <span className="text-sm font-medium text-[#667085]">
              Showing {indexOfFirstProduct + 1} -{" "}
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length}
            </span>
            <div className="flex gap-2">
              <button
                className={`p-0 border-[#EAF8FF] min-w-7 w-7 lg:min-w-8 lg:w-8 min-h-7 h-7 lg:min-h-8 lg:h-8 bg-[#EAF8FF] duration-500 ${
                  currentPage !== 1
                    ? "group hover:bg-[#2086BF] hover:border-[#2086BF]"
                    : "cursor-not-allowed brightness-100"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <Image
                  src="/icons/previous.svg"
                  className={`duration-400 min-w-3 w-3 lg:min-w-4 lg:w-4 ${
                    currentPage !== 1
                      ? "group-hover:brightness-[1000]"
                      : "brightness-150"
                  }`}
                  alt="<"
                  width={16}
                  height={16}
                />
              </button>

              {/* Page Number Buttons */}

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`p-0 border-[#EAF8FF] min-w-7 w-7 lg:min-w-8 lg:w-8 min-h-7 h-7 lg:min-h-8 lg:h-8 text-sm font-medium ${
                        currentPage === index + 1
                          ? "bg-[#2086BF] text-white"
                          : "bg-[#EAF8FF] text-[#667085] hover:bg-[#2086BF] hover:border-[#2086BF] hover:text-white"
                      } duration-500 rounded`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}

              <button
                className={`p-0 border-[#EAF8FF] min-w-7 w-7 lg:min-w-8 lg:w-8 min-h-7 h-7 lg:min-h-8 lg:h-8 bg-[#EAF8FF] duration-500 ${
                  currentPage !== totalPages
                    ? "group hover:bg-[#2086BF] hover:border-[#2086BF]"
                    : "cursor-not-allowed brightness-100"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <Image
                  src="/icons/next.svg"
                  className={`duration-400 min-w-3 w-3 lg:min-w-4 lg:w-4 ${
                    currentPage !== totalPages
                      ? "group-hover:brightness-[1000]"
                      : "brightness-150"
                  }`}
                  alt=">"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal for viewing product details */}
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
