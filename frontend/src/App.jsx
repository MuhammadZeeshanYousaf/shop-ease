import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./components/Auth.jsx";
import SellerPages from "./pages/seller/index.jsx";
import CustomerPages from "./pages/customer/index.jsx";
import Error from "./pages/Error.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          {/* Authenticated Routes */}
          <Route path="customer" element={<Auth type="customer" />}>
            <Route path="*" element={<CustomerPages />} />
          </Route>
          <Route path="seller" element={<Auth type="seller" />}>
            <Route path="*" element={<SellerPages />} />
          </Route>

          <Route path="*" element={<Error code={404} message="Page not found" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
