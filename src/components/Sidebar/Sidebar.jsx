import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState, useRef, useEffect } from "react";


const navItems = [
  { name: "Dashboard", icon: HiOutlineSquares2X2, path: "/" },
  { name: "Inmates", icon: HiOutlineUsers, path: "/inmates" },
  { name: "Staffs", icon: HiOutlineUserGroup, path: "/staffs" },
  { name: "Tasks", icon: HiOutlineClipboardDocumentList, path: "/tasks" },
  { name: "Profile", icon: HiOutlineUserCircle, path: "/profile" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setCollapsed(true);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



  return (
    <aside  ref={sidebarRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed left-0 top-0 z-40 h-screen m-3  rounded-xl        
      ${collapsed ? "w-20" : "w-64"}
      transition-all duration-300 ease-in-out
      bg-neutral-900/90 backdrop-blur-xl
      border-r border-neutral-800
      shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      overflow-visible
      flex flex-col`}
    >
      {/* LOGO + TOGGLE */}
      <div className="relative flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Kripa"
            className="w-9 h-9 rounded-lg"
          />

          {!collapsed && (
            <div>
              <h1 className="text-white poppins font-semibold leading-none">
                Kripa
              </h1>
              <p className="text-xs poppins text-neutral-300">
                Charitable Trust
              </p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            absolute right-3
            p-1.5 rounded-lg
            bg-neutral-800
            text-neutral-400 hover:text-white
            transition-all duration-200
            ${collapsed
              ? hovered
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75 pointer-events-none"
              : "opacity-100 scale-100"}
          `}
        >
          {collapsed ? (
            <HiOutlineChevronRight size={18} />
          ) : (
            <HiOutlineChevronLeft size={18} />
          )}
        </button>

      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setCollapsed(true)}
              className={({ isActive }) =>
                `group relative flex items-center
                ${collapsed ? "justify-center" : "gap-3"}
                px-3 py-2.5 rounded-lg
                text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`
              }
            >
              {/* Active Indicator */}
              <span
                className={`absolute left-0 h-6 w-1 rounded-r-full bg-indigo-500
                ${collapsed ? "hidden" : ""}
                opacity-0 group-[.active]:opacity-100`}
              />

             <Icon className="text-xl shrink-0" />

              {!collapsed && <span>{item.name}</span>}

              {collapsed && (
                <span
                  className="
                    absolute left-16
                    px-3 py-1.5
                    rounded-lg
                    bg-neutral-800 text-white text-xs
                    whitespace-nowrap
                    opacity-0 scale-95
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-200
                    pointer-events-none
                    shadow-lg
                  "
                >
                  {item.name}
                </span>
              )}

            </NavLink>
          );
        })}
      </nav>

      {/* SUPPORT */}
      <div className="px-3 pb-4">
        <button
          className={`w-full flex items-center
          ${collapsed ? "justify-center" : "gap-3"}
          px-3 py-2.5 rounded-xl
          text-sm text-neutral-400
          hover:bg-neutral-800 hover:text-white transition`}
        >
          <HiOutlineQuestionMarkCircle className="text-xl" />
          {!collapsed && <span>Support</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
