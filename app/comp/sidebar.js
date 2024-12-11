"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null); // Tracking the open submenu index
  const router = useRouter();
  const pathname = usePathname(); // Getting the current path

  // Loading menu items from JSON
  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch("/json/menu.json");
      const data = await response.json();
      setMenuItems(data);

      // Checking if any submenu item is active and set the submenu index
      const activeIndex = data.findIndex(
        (menuItem) =>
          menuItem.submenu &&
          menuItem.submenu.some((subItem) => subItem.path === pathname)
      );
      if (activeIndex !== -1) {
        setOpenSubmenuIndex(activeIndex);
        localStorage.setItem("openSubmenuIndex", activeIndex);
      }
    };

    fetchMenuItems();

    // Getting the saved submenu index from localStorage
    const savedSubmenuIndex = localStorage.getItem("openSubmenuIndex");
    if (savedSubmenuIndex) {
      setOpenSubmenuIndex(Number(savedSubmenuIndex));
    }
  }, [pathname]);

  // Toggle submenu visibility
  const toggleSubmenu = (index) => {
    setOpenSubmenuIndex((prevIndex) => {
      const newIndex = prevIndex === index ? null : index;
      localStorage.setItem("openSubmenuIndex", newIndex);
      return newIndex;
    });
  };

  // Handle navigation for main menu and submenu
  const navigateTo = (path, isSubmenu = false) => {
    router.push(path);
    // Close all submenus only if it's a main menu navigation
    if (!isSubmenu) {
      setOpenSubmenuIndex(null);
      localStorage.setItem("openSubmenuIndex", null); // Clear the saved state when navigating to a new main menu
    }
  };

  return (
    <aside className="fixed md:w-64 h-screen overflow-y-auto">
      <div className="px-5 py-6 flex items-center gap-3">
        <Image src="/logo.svg" alt="MT" width={34} height={34} />
        <h1 className="text-2xl">Mytech</h1>
      </div>
      <div className="py-4">
        <ul className="flex flex-col gap-2">
          {menuItems.map((menuItem, index) => {
            // Determine if the main menu item is active
            const isActiveMenuItem =
              pathname === menuItem.path ||
              (menuItem.submenu &&
                menuItem.submenu.some((subItem) => pathname === subItem.path));

            return (
              <li key={index}>
                {/* Main menu item */}
                <a
                  onClick={() =>
                    menuItem.submenu
                      ? toggleSubmenu(index)
                      : navigateTo(menuItem.path || "/")
                  }
                  className={`group cursor-pointer text-sm font-semibold text-[#4A4C56] hover:text-[#2086BF] duration-500 flex relative items-center gap-2 py-3 px-6 hover:bg-[#EAF8FF] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:h-full hover:before:bg-[#2086BF] before:duration-500 ${
                    openSubmenuIndex === index ? "bg-[#EAF8FF]" : ""
                  } ${
                    isActiveMenuItem
                      ? "bg-[#EAF8FF] before:bg-[#2086BF] text-[#2086BF]"
                      : ""
                  }`}
                >
                  <Image
                    src={menuItem.icon}
                    className={`grayscale duration-500 group-hover:grayscale-0 ${
                      isActiveMenuItem ? "grayscale-0" : ""
                    }`}
                    alt={`${menuItem.title} Icon`}
                    width={24}
                    height={24}
                  />
                  {menuItem.title}

                  {menuItem.submenu && (
                    <Image
                      src="/icons/dropdown.svg"
                      alt="Dropdown Icon"
                      className={`absolute right-6 top-2/4 -translate-y-2/4 duration-500 ${
                        openSubmenuIndex === index ? "-rotate-180" : ""
                      }`}
                      width={24}
                      height={24}
                    />
                  )}
                </a>

                {/* Submenu */}
                {menuItem.submenu && (
                  <ul
                    className={`flex flex-col gap-1 transition-[max-height] duration-500 ${
                      openSubmenuIndex === index
                        ? "max-h-screen"
                        : "max-h-0 overflow-hidden"
                    }`}
                  >
                    {menuItem.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          onClick={() => navigateTo(subItem.path || "/", true)}
                          className={`cursor-pointer text-sm font-semibold text-[#4A4C56] hover:text-[#2086BF] duration-500 flex relative items-center gap-2 py-3 px-6 hover:bg-[#EAF8FF] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:h-full hover:before:bg-[#2086BF] before:duration-500 ${
                            pathname === subItem.path
                              ? "bg-[#EAF8FF] before:bg-[#2086BF] text-[#2086BF]"
                              : ""
                          }`}
                        >
                          <span className="w-6"></span>
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
