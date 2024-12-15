"use client";

import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditProduct() {
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState({});
  const [productStatus, setProductStatus] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    sku: "",
    quantity: "",
    categoryId: "",
    statusId: "",
    discountType: "",
    discountPercentage: "",
    taxClass: "",
    vatAmount: "",
    shipping: {
      weight: "",
      height: "",
      length: "",
      width: "",
      isPhysicalProduct: false,
    },
    variations: [],
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("id");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/json/products.json");
        const data = await res.json();

        // Load categories and product statuses
        setCategories(data.categories);
        setProductStatus(data.productStatus);

        // Determine mode (edit or add) and populate form data if editing
        setIsEditMode(!!productId);

        if (productId) {
          const product = data.products.find((item) => item.id === productId);
          if (product) {
            setFormData({
              name: product.name,
              description: product.details.description || "",
              basePrice: product.details.basePrice || "",
              sku: product.details.sku || "",
              quantity: product.details.quantity || "",
              categoryId: product.categoryId || "",
              statusId: product.details.statusId || "",
              discountType: product.details.discount.type || "No Discount",
              discountPercentage: product.details.discount.percentage || 0,
              taxClass: product.details.taxClass || "Tax Free",
              vatAmount: product.details.vatAmount || 0,
              shipping: {
                weight: product.shipping.weight || "",
                height: product.shipping.height || "",
                length: product.shipping.length || "",
                width: product.shipping.width || "",
                isPhysicalProduct: product.shipping.isPhysicalProduct || false,
              },
              variations: product.variations || [],
            });
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    if (isEditMode) {
      alert(`Updated product with ID: ${productId}`, formData);
    } else {
      alert("Created a new product:", formData);
    }
    router.push("/products");
  };

  return (
    <>
      <Head>
        <title>{isEditMode ? "Edit Product" : "Add Product"}</title>
        <meta
          name="description"
          content={isEditMode ? "Edit Product" : "Add Product"}
        />
      </Head>
      <div className="detail-page px-6">
        {/* Heading Area */}
        <div className="heading-area flex flex-wrap justify-between items-end gap-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h1>
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
              <span className="text-[#667085]">
                {isEditMode ? "Edit Product" : "Add Product"}
              </span>
            </nav>
          </div>
          <div className="flex gap-4">
            <a
              href="/products"
              className="group mytech-btn export-btn bg-transparent border- hover:bg-[#858D9D] text-[#858D9D] border-[#858D9D] hover:text-white"
            >
              <Image
                src="/icons/close.svg"
                className="group-hover:brightness-[1000] duration-300 min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5"
                alt="Download Icon"
                width={20}
                height={20}
              />
              Cancel
            </a>
            <button
              onClick={handleSave}
              className="add-product-btn bg-[#2086BF] text-white border border-[#2086BF] opacity-65 hover:opacity-100"
            >
              <Image
                src="/icons/save.svg"
                className="brightness-[1000] min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5"
                alt="Plus Icon"
                width={20}
                height={20}
              />
              Save Product
            </button>
          </div>
        </div>

        <div className="detail-page-content flex items-start flex-col-reverse md:flex-row gap-6 py-6">
          <div className="editable-content flex-grow flex flex-col gap-6">
            {/* General Information */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>General Information</h4>

              <label className="product-name">
                <h6 className="text-[#777980] font-medium mb-1">
                  Product Name
                </h6>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  required
                />
              </label>

              <label className="description">
                <h6 className="text-[#777980] font-medium mb-1">Description</h6>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none min-h-36 resize-y"
                  required
                ></textarea>
              </label>
            </div>

            {/* Media */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Media</h4>

              <label className="photo">
                <h6 className="text-[#777980] font-medium mb-1">Photo</h6>

                <div className="p-6 rounded-lg bg-[#F9F9FC] border border-dotted border-[#E0E2E7] flex flex-col items-center gap-4">
                  <input
                    type="file"
                    className="hidden"
                    placeholder="Add Image"
                  />
                  <div className="flex justify-center gap-4">
                    {formData.media ? (
                      formData.media?.map((image, index) => (
                        <div
                          key={index}
                          className="bg-[#E0E2E7] rounded-lg min-w-16 lg:min-w-[100px] w-16 lg:w-[100px] h-16 lg:h-[100px] p-1 flex items-start justify-end"
                        >
                          <Image
                            src={image || ""}
                            alt="Media"
                            width={24}
                            height={24}
                            className="min-w-5 lg:min-w-6 w-5 lg:w-6 h-5 lg:h-6"
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="bg-[#E0E2E7] rounded-lg min-w-16 lg:min-w-[100px] w-16 lg:w-[100px] h-16 lg:h-[100px] p-1 flex items-start justify-end">
                          <Image
                            src="/icons/success.svg"
                            className="min-w-5 lg:min-w-6 w-5 lg:w-6 h-5 lg:h-6"
                            alt="Tick Icon"
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="bg-[#E0E2E7] rounded-lg min-w-16 lg:min-w-[100px] w-16 lg:w-[100px] h-16 lg:h-[100px] p-1 flex items-start justify-end">
                          <Image
                            src="/icons/success.svg"
                            className="min-w-5 lg:min-w-6 w-5 lg:w-6 h-5 lg:h-6"
                            alt="Tick Icon"
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="bg-[#E0E2E7] rounded-lg min-w-16 lg:min-w-[100px] w-16 lg:w-[100px] h-16 lg:h-[100px] p-1 flex items-start justify-end">
                          <Image
                            src="/icons/success.svg"
                            className="min-w-5 lg:min-w-6 w-5 lg:w-6 h-5 lg:h-6"
                            alt="Tick Icon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-center text-[#858D9D]">
                    Drag and drop image here, or click add image
                  </p>
                  <button className="bg-[#EAF8FF] border-[#EAF8FF] text-[#2086BF] hover:bg-[#2086BF] hover:border-[#2086BF] hover:text-white">
                    Add Image
                  </button>
                </div>
              </label>
            </div>

            {/* Pricing Information */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Pricing</h4>

              <label className="base-price">
                <h6 className="text-[#777980] font-medium mb-1">Base Price</h6>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Enter base price"
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <label className="discount-type">
                  <h6 className="text-[#777980] font-medium mb-1">
                    Discount Type
                  </h6>
                  <select
                    name="discountType"
                    value={formData.discountType || "No Discount"}
                    onChange={handleInputChange}
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  >
                    <option value="No Discount">No Discount</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat</option>
                  </select>
                </label>
                <label className="discount-precentage">
                  <h6 className="text-[#777980] font-medium mb-1">
                    Discount Precentage (%)
                  </h6>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage || ""}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Enter discount percentage"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <label className="tax-class">
                  <h6 className="text-[#777980] font-medium mb-1">Tax Class</h6>
                  <select
                    name="taxClass"
                    value={formData.taxClass || "Tax Free"}
                    onChange={handleInputChange}
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  >
                    <option value="Tax Free">Tax Free</option>
                    <option value="GST">GST</option>
                    <option value="VAT">VAT</option>
                  </select>
                </label>
                <label className="vat-amount">
                  <h6 className="text-[#777980] font-medium mb-1">
                    VAT Amount (%)
                  </h6>
                  <input
                    type="number"
                    name="vatAmount"
                    value={formData.vatAmount || ""}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Enter VAT amount"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
              </div>
            </div>

            {/* Inventory Information */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Inventory</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <label className="sku">
                  <h6 className="text-[#777980] font-medium mb-1">SKU</h6>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku || ""}
                    onChange={handleInputChange}
                    placeholder="Enter SKU"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
                <label className="barcode">
                  <h6 className="text-[#777980] font-medium mb-1">Barcode</h6>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode || ""}
                    onChange={handleInputChange}
                    placeholder="Enter barcode"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
                <label className="quantity">
                  <h6 className="text-[#777980] font-medium mb-1">Quantity</h6>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity || ""}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Enter quantity"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
              </div>
            </div>

            {/* Variation Information */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Variation</h4>

              {formData.variations.map((variation, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3.5"
                >
                  <label className="variation-type">
                    <h6 className="text-[#777980] font-medium mb-1">
                      Variation Type
                    </h6>
                    <input
                      type="text"
                      name={`variationType-${index}`}
                      value={variation.type}
                      placeholder="Enter variation type"
                      className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                      readOnly
                    />
                  </label>
                  <label className="variation-value">
                    <h6 className="text-[#777980] font-medium mb-1">
                      Variation
                    </h6>
                    <input
                      type="text"
                      name={`variationValue-${index}`}
                      value={variation.value}
                      placeholder="Enter variation"
                      className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                      readOnly
                    />
                  </label>
                </div>
              ))}
              <button className="group bg-[#EAF8FF] hover:bg-[#2086BF] text-[#2086BF] hover:text-white">
                <Image
                  src="/icons/plus.svg"
                  className="group-hover:brightness-[1000] duration-300"
                  alt="Add Icon"
                  width={20}
                  height={20}
                />
                Add Variant
              </button>
            </div>

            {/* Shiping Information */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Shiping</h4>

              <label className="physical-product flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPhysicalProduct"
                  checked={formData.shipping.isPhysicalProduct}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shipping: {
                        ...prev.shipping,
                        isPhysicalProduct: e.target.checked,
                      },
                    }))
                  }
                  className="min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5 rounded-md border-2 border-[#858D9D] outline-0"
                />
                <h6 className="text-[#2086BF]">This is a physical product</h6>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <label className="weight">
                  <h6 className="text-[#777980] font-medium mb-1">Weight</h6>
                  <input
                    type="text"
                    name="weight"
                    value={formData.shipping.weight}
                    onChange={handleShippingChange}
                    placeholder="Enter weight"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
                <label className="height">
                  <h6 className="text-[#777980] font-medium mb-1">Height</h6>
                  <input
                    type="text"
                    name="height"
                    value={formData.shipping.height}
                    onChange={handleShippingChange}
                    placeholder="Enter height"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
                <label className="length">
                  <h6 className="text-[#777980] font-medium mb-1">Length</h6>
                  <input
                    type="text"
                    name="length"
                    value={formData.shipping.length}
                    onChange={handleShippingChange}
                    placeholder="Enter length"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
                <label className="width">
                  <h6 className="text-[#777980] font-medium mb-1">Width</h6>
                  <input
                    type="text"
                    name="width"
                    value={formData.shipping.width}
                    onChange={handleShippingChange}
                    placeholder="Enter width"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="sidebar-dropdowns w-full md:w-44 lg:w-[264px] md:sticky md:top-24  flex flex-col gap-6">
            {/* Category Dropdown */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Category</h4>

              <label className="product-category">
                <h6 className="text-[#777980] font-medium mb-1">
                  Product Category
                </h6>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                >
                  {Object.entries(categories).map(([id, category]) => (
                    <option key={id} value={id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="product-tags">
                <h6 className="text-[#777980] font-medium mb-1">
                  Product Tags
                </h6>
                <select className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none">
                  <option>Watch</option>
                  <option>Gadget</option>
                </select>
              </label>
            </div>

            {/* Status Dropdown */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Status</h4>

              <label className="product-status">
                <h6 className="text-[#777980] font-medium mb-1">
                  Product Status
                </h6>
                <select
                  name="statusId"
                  value={formData.statusId}
                  onChange={handleInputChange}
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                >
                  {Object.entries(productStatus).map(([id, status]) => (
                    <option key={id} value={id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
