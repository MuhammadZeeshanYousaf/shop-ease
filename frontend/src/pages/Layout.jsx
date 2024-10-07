import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="p-4 bg-gray-100">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
