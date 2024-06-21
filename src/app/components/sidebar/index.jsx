import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Fixed Menu
const fixedMenu = [
  { name: "General", path: "/", icon: "mdi:cog" },
  { name: "Teams", path: "/teams", icon: "mdi:account-group" },
  { name: "Billing", path: "/billing", icon: "mdi:credit-card" },
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
        <aside className="sidebar px-2 bg-gray-2 sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
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
                            pathname === item.path ? "bg-gray-6 py-4" : ""
                          }hover:bg-gray-4`}
                        >
                          <Icon icon={item.icon} fontSize={24} />
                          <span className="font-medium text-base ml-2">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
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
                                    ? "bg-gray-6 py-2"
                                    : ""
                                }hover:bg-gray-4`}
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
          <section className="sidebar-footer justify-end pt-2">
            <div className="divider my-0"></div>
            <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-6">
              <label
                className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-6"
                tabIndex="0"
              >
                <div className="flex flex-row gap-4 p-4">
                  <div className="avatar avatar-md">
                    <Image
                      src="/vercel.svg"
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Sandra Marx</span>
                    <span className="text-xs font-normal text-content2">
                      sandra
                    </span>
                  </div>
                </div>
              </label>
              <div className="dropdown-menu dropdown-menu-right-top ml-2">
                <a className="dropdown-item text-sm">Profile</a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Account settings
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Change email
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Subscriptions
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Change password
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Refer a friend
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Settings
                </a>
              </div>
            </div>
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
