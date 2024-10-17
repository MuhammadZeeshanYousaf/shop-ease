import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext";
import Authenticated from "./components/Authenticated.jsx";
import SellerPages from "./pages/seller/index.jsx";
import CustomerPages from "./pages/customer/index.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Register from "./pages/Register.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { reduxStore, storePersistor } from "./store";
import Checkout from "./pages/Checkout.jsx";

function App() {
  return (
    <Router>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={storePersistor}>
          <AuthProvider>
            <Routes>
              {/* User section layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="checkout" element={<Authenticated type="each" />}>
                  <Route index element={<Checkout />} />
                </Route>
                <Route path="login/:role" element={<Login />} />
                <Route path="register/:role" element={<Register />} />
              </Route>

              {/* Authenticated Routes */}
              <Route path="customer" element={<Authenticated type="customer" />}>
                <Route path="*" element={<CustomerPages />} />
              </Route>
              <Route path="seller" element={<Authenticated type="seller" />}>
                <Route path="*" element={<SellerPages />} />
              </Route>

              <Route path="/" element={<Layout />}>
                <Route path="*" element={<ErrorPage code={404} message="Page not found" />} />
              </Route>
            </Routes>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
