import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="p-4 bg-gray-100">
        <Outlet />
      </main>

      <Footer />
      <Toaster position="top-center" containerClassName="adjust-toast" />
    </div>
  );
};

export default Layout;
