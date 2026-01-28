import { HiOutlineBell, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { logout } = useAuth();

  return (
    <header className="h-18 flex items-center justify-between px-6 border-b border-neutral-800">
      <div className="text-sm text-neutral-400">Dashboard</div>

      <div className="flex items-center gap-4">
        <button className="text-neutral-400 hover:text-white">
          <HiOutlineBell className="text-xl" />
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-neutral-400 hover:text-red-400 transition"
        >
          <HiOutlineArrowRightOnRectangle className="text-xl" />
          <span className="text-sm hidden md:block">Logout</span>
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;
