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
          className="text-sm font-medium outline-0 bg-transparent flex-grow placeholder:text-[#858D9D] "
        />
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-4">
        {/* Action icons */}
        <ul className="flex items-center gap-4 pr-4 border-r border-[#F0F1F3]">
          <li className="w-10 h-10 relative flex items-center justify-center">
            <Image
              src="/icons/calendar.svg"
              className="cursor-pointer hover:brightness-0 duration-500"
              alt="Calendar Icon"
              width={24}
              height={24}
            />
          </li>
          <li className="w-10 h-10 relative flex items-center justify-center">
            <Image
              src="/icons/bell.svg"
              className="cursor-pointer hover:brightness-0 duration-500"
              alt="Calendar Icon"
              width={24}
              height={24}
            />
          </li>
          <li className="w-10 h-10 relative flex items-center justify-center">
            <Image
              src="/icons/chat.svg"
              className="cursor-pointer hover:brightness-0 duration-500"
              alt="Chat Icon"
              width={24}
              height={24}
            />
          </li>
          <li className="w-10 h-10 relative flex items-center justify-center">
            <span className="w-7 h-7 bg-[#E0E2E7] rounded-full"></span>
          </li>
        </ul>

        {/* Profile Action */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E0E2E7] rounded-full relative">
            <span className="w-[10px] h-[10px] rounded-full bg-[#22CAAD] block absolute right-0 bottom-0 border-2 border-white"></span>
          </div>

          <div className="flex flex-col gap-0.5 justify-center">
            <h6 className="font-medium">Jenil Patel</h6>
            <p className="text-xs font-medium text-[#4A4C56]">Manager</p>
          </div>

          <Image
            src="/icons/dropdown.svg"
            className="cursor-pointer hover:brightness-0 hover:-rotate-180 duration-500"
            alt="Dropdown Icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </header>
  );
}
