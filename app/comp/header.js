import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center gap-8 justify-between p-6">
      {/* Search Area */}
      <div className="flex items-center gap-2 p-2 flex-grow">
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={24}
          height={24}
        />

        <input
          type="search"
          placeholder="Search"
          className="text-sm font-medium outline-0 flex-grow placeholder:text-[#858D9D] "
        />
      </div>
    </header>
  );
}
