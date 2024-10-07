import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./components/Auth.jsx";
import SellerPages from "./pages/seller/index.jsx";
import CustomerPages from "./pages/customer/index.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* User section layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Authenticated Routes */}
          <Route path="customer" element={<Auth type="customer" />}>
            <Route path="*" element={<CustomerPages />} />
          </Route>
          <Route path="seller" element={<Auth type="seller" />}>
            <Route path="*" element={<SellerPages />} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route path="*" element={<ErrorPage code={404} message="Page not found" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
