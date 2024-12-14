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
            <button className="add-product-btn bg-[#2086BF] text-white border border-[#2086BF] opacity-65 hover:opacity-100">
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
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  placeholder={"Smartwatch E2"}
                  // value={"Smartwatch E2"}
                />
              </label>

              <label className="description">
                <h6 className="text-[#777980] font-medium mb-1">Description</h6>
                <textarea
                  type="text"
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none min-h-36 resize-y"
                >
                  {/* Value of Description */}
                </textarea>
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
                  className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                  min="0"
                  placeholder={"400.00"}
                  // value={"400.00"}
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <label className="discount-type">
                  <h6 className="text-[#777980] font-medium mb-1">
                    Discount Type
                  </h6>
                  <select className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none">
                    <option>No Discount</option>
                  </select>
                </label>
                <label className="discount-precentage">
                  <h6 className="text-[#777980] font-medium mb-1">
                    Discount Precentage (%)
                  </h6>
                  <input
                    type="number"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    min="0"
                    placeholder={"0"}
                    // value={"0"}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <label className="tax-class">
                  <h6 className="text-[#777980] font-medium mb-1">Tax Class</h6>
                  <select className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none">
                    <option>Tax Free</option>
                  </select>
                </label>
                <label className="vat-amount">
                  <h6 className="text-[#777980] font-medium mb-1">
                    VAT Amount (%)
                  </h6>
                  <input
                    type="number"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    min="0"
                    placeholder={"0"}
                    // value={"0"}
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
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"302002"}
                    // value={"302002"}
                  />
                </label>
                <label className="barcode">
                  <h6 className="text-[#777980] font-medium mb-1">Barcode</h6>
                  <input
                    type="text"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"302002"}
                    // value={"302002"}
                  />
                </label>
                <label className="quantity">
                  <h6 className="text-[#777980] font-medium mb-1">Quantity</h6>
                  <input
                    type="number"
                    min="0"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"124"}
                    // value={"124"}
                  />
                </label>
              </div>
            </div>

            {/* Variation Information */}
            <div className="bg-white shadow-shadow2 rounded-xl p-6 flex flex-col gap-3.5">
              <h4>Variation</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <label className="variation-type">
                  <h6 className="text-[#777980] font-medium mb-1">
                    Variation Type
                  </h6>
                  <select className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none">
                    <option>Color</option>
                  </select>
                </label>
                <label className="Variation">
                  <h6 className="text-[#777980] font-medium mb-1">Variation</h6>
                  <input
                    type="text"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"Black"}
                    // value={"Black"}
                  />
                </label>
              </div>

              <button className="group export-btn bg-[#EAF8FF] hover:bg-[#2086BF] text-[#2086BF] hover:text-white">
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
                  className="min-w-4 w-4 h-4 lg:min-w-5 lg:w-5 lg:h-5 rounded-md border-2 border-[#858D9D] outline-0"
                  placeholder={"This is a physical product"}
                />
                <h6 className="text-[#2086BF]">This is a physical product</h6>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <label className="weight">
                  <h6 className="text-[#777980] font-medium mb-1">Weight</h6>
                  <input
                    type="text"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"0.25 kg"}
                    // value={"0.25 kg"}
                  />
                </label>
                <label className="height">
                  <h6 className="text-[#777980] font-medium mb-1">Height</h6>
                  <input
                    type="text"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"10 cm"}
                    // value={"10 cm"}
                  />
                </label>
                <label className="length">
                  <h6 className="text-[#777980] font-medium mb-1">Length</h6>
                  <input
                    type="text"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"10 cm"}
                    // value={"10 cm"}
                  />
                </label>
                <label className="width">
                  <h6 className="text-[#777980] font-medium mb-1">Width</h6>
                  <input
                    type="text"
                    className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none"
                    placeholder={"7 cm"}
                    // value={"7 cm"}
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
                <select className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none">
                  <option>Watch</option>
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
                <select className="bg-[#F9F9FC] border border-[#E0E2E7] text-sm font-normal rounded-lg px-3 py-2.5 w-full placeholder:text-gray-400 text-[#1D1F2C] outline-none">
                  <option>Published</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
