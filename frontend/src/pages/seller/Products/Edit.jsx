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
          console.error(e.response.data.message || e.message);
        });
    } else toast.error("Invalid product");
  }, []);

  const onProductSubmit = e => {
    e.preventDefault();
    const data = productRef.current.product;
    if (data.name && data.price) {
      api
        .put(`/products/${productId}`, { ...data, image: data.image?.name})
        .then(res => {
          if (res.data.ok) {
            toast.success("Product updated successfully");
            navigate("/seller/products", { state: { reload: true } });
          } else toast(res.data.message);
        })
        .catch(e => {
          console.error(e.response.data.message || e.message);
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
        >
          <ProductFields ref={productRef} {...product} />
        </FormModal>
      )}
    </>
  );
};

export default EditProduct;
