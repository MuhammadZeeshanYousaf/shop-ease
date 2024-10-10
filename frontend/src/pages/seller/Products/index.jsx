import { useEffect, useState } from "react";
import api from "../../../utils/api";
import toast from "react-hot-toast";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CreateProduct from "./Create";
import EditProduct from "./Edit";
import ViewProduct from "./View";
import DeleteProduct from "./Delete";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const reload = location.state?.reload;

  const fetchProducts = () => {
    api
      .get("/products/my_products")
      .then(res => {
        if (res.data?.ok) {
          const apiProducts = res.data.data;
          setProducts(apiProducts);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(e => {
        console.error(e.response.data.message || e.message);
      });
  };

  if (reload) {
    fetchProducts();
    location.state.reload = false;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto overflow-x-auto">
      <Link to="/seller/products/create" className="btn mb-5">
        Create Product
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-3 px-6 font-semibold text-gray-600">Image</th>
            <th className="py-3 px-6 font-semibold text-gray-600">Product Name</th>
            <th className="py-3 px-6 font-semibold text-gray-600">Price</th>
            <th className="py-3 px-6 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => navigate(`${product._id}/view`)}
              >
                <td className="py-4 px-6">
                  <img src={product.image || "https://via.placeholder.com/80x80"} alt="product image" width={80} />
                </td>
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{product.price}</td>
                <td className="py-4 px-6">
                  <Link
                    to={`${product._id}/edit`}
                    onClick={e => e.stopPropagation()}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md mr-2 transition-colors duration-200"
                  >
                    <i className="fa fa-pencil"></i> Edit
                  </Link>
                  <Link
                    to={`${product._id}/delete`}
                    onClick={e => e.stopPropagation()}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition-colors duration-200"
                  >
                    <i className="fa fa-trash"></i> Delete
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td></td>
                <td></td>
                <td className="text-gray-500 italic py-10">
                  There is no product, click to{" "}
                  <span className="text-fuchsia-500 font-semibold hover:underline">
                    <Link to="create">Create</Link>
                  </span>
                </td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* Child Routes definition that need to render along with Products */}
      <Routes>
        <Route path="create" element={<CreateProduct />} />
        <Route path=":productId/edit" element={<EditProduct />} />
        <Route path=":productId/view" element={<ViewProduct />} />
        <Route path=":productId/delete" element={<DeleteProduct />} />
      </Routes>
    </div>
  );
};

export default Products;
