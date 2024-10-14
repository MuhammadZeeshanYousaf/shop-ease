import { useNavigate, useParams } from "react-router-dom";
import FormModal from "../../../components/ui/FormModal";
import ProductFields from "./ProductFields";
import { useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";

const EditProduct = () => {
  const navigate = useNavigate();
  const productRef = useRef();
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

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

  const onProductSubmit = e => {
    e.preventDefault();
    const data = productRef.current.product;

    if (data.name && data.price) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      if (data.image) formData.append("image", data.image);

      const apiPromise = api
        .put(`/products/${productId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then(res => {
          if (res.data.ok) navigate("/seller/products", { state: { reload: true } });
          return res;
        })
        .finally(() => setLoading(false));

      toast.promise(apiPromise, {
        loading: "Updating product...",
        success: res => res.data.message,
        error: e => e.response?.data?.message ?? e.message,
      });
    } else toast.error("Fill all required fields");
  };

  return (
    <>
      {product && (
        <FormModal
          isOpen
          onClose={() => navigate("/seller/products")}
          title="Edit Product"
          submitText="Update"
          onSubmit={onProductSubmit}
          loading={loading}
        >
          <ProductFields ref={productRef} {...product} />
        </FormModal>
      )}
    </>
  );
};

export default EditProduct;
