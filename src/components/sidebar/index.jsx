import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Local components
import LogoutButton from "../auth/LogoutButton";

// Fixed Menu
const fixedMenu = [
  { name: "General", path: "/", icon: "mdi:cog" },
  { name: "Teams", path: "/teams", icon: "mdi:account-group" },
  { name: "Mails", path: "/mails", icon: "mdi:mail" },
];

// Dynamic Menu
const dynamicMenu = [
  {
    name: "Account",
    icon: "mdi:account",
    link: "/account",
    subMenu: [
      { name: "Accounts", path: "/account/accounts" },
      { name: "Billing", path: "/account/billing" },
      { name: "Security", path: "/account/security" },
      { name: "Notifications", path: "/account/notifications" },
      { name: "Integrations", path: "/account/integrations" },
    ],
  },
];

const Sidebar = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex">
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        <aside className="sidebar px-2 bg-gradient-to-tr from-blue-500 to-purple-600 sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <section className="sidebar-title items-center p-4 justify-center my-3">
            <Image
              src="/next.svg"
              alt="NEXT Logo"
              width={190}
              height={37}
              priority
            />
          </section>
          <section className="sidebar-content">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <ul className="flex flex-col gap-4 text-white">
                  {fixedMenu.map((item, index) => (
                    <li key={index}>
                      <Link href={item.path}>
                        <div
                          className={`menu-item ${
                            pathname === item.path ? "bg-slate-900/10 py-4" : ""
                          }`}
                        >
                          <Icon icon={item.icon} fontSize={24} />
                          <span className="font-medium text-base ml-2">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}

                
                  <LogoutButton />

                  {dynamicMenu.map((item, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`menu-${index}`}
                        className="menu-toggle"
                      />
                      <label
                        htmlFor={`menu-${index}`}
                        className="menu-item justify-between"
                      >
                        <div className="flex gap-2">
                          <Icon icon={item.icon} fontSize={24} />
                          <span className="font-medium text-base ml-2">
                            {item.name}
                          </span>
                        </div>
                        <span className="menu-icon">
                          <Icon icon="mdi:chevron-down" fontSize={24} />
                        </span>
                      </label>
                      <div className="menu-item-collapse">
                        <div className="min-h-0">
                          {item.subMenu.map((subItem, subIndex) => (
                            <Link key={subIndex} href={subItem.path}>
                              <label
                                className={`menu-item ml-6 ${
                                  pathname === subItem.path
                                    ? "bg-slate-900/10 py-2"
                                    : ""
                                }`}
                              >
                                {subItem.name}
                              </label>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </nav>
          </section>
        </aside>
      </div>
      <div className="flex w-full flex-col">
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn-primary btn sm:hidden"
          >
            Open Sidebar
          </label>
        </div>
        <div className="flex flex-col bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
