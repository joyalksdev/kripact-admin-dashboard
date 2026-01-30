import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="relative flex bg-neutral-950 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen ml-[5.5rem]">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-neutral-950">
          <div className="max-w-[1400px] mx-auto p-6">
            <Outlet />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="dark"
            />
          </div>
        </main>

      </div>
    </div>
  );
};

export default RootLayout;
