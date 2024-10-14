import { Link, useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import Modal from "../../../components/ui/Modal";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useLayoutEffect(() => {
    if (productId) {
      api
        .get(`/products/${productId}`)
        .then(res => {
          if (res.data.ok) {
            setProduct(res.data.data);
          } else toast(res.data.message);
        })
        .catch(e => {
          console.error(e.response.data?.message || e.message);
        });
    } else toast.error("Invalid product");
  }, []);

  return (
    <>
      {product && (
        <Modal isOpen onClose={() => navigate("/seller/products")} title="View Product">
          <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Product Image */}
            <img className="w-full h-80 object-contain" src={product.image ?? "https://via.placeholder.com/300x200"} alt="Product Image" />
            {/* Card Content */}
            <div className="p-5">
              {/* Product Name */}
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">{product.name}</h5>
              {/* Price */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-bold text-fuchsia-600">${product.price}</span>
              </div>
              {/* Description */}
              <p className="mt-2 text-gray-500">A perfect modern chair for your living room.</p>
              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <Link to={`/seller/products/${product._id}/edit`} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                  Edit
                </Link>
                <a href="#" className="text-fuchsia-600 hover:underline">
                  Un-publish
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ViewProduct;
