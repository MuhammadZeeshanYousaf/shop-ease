import { useNavigate } from "react-router-dom";
import FormModal from "../../../components/ui/FormModal";
import ProductFields from "./ProductFields";
import Products from "./index";
import { useRef } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

const CreateProducts = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const productRef = useRef();

  const onProductSubmit = e => {
    e.preventDefault();
    const data = productRef.current.product;
    if (data.name && data.price && data.image) {
      api
        .post("/products", { ...data, image: data.image.name, user: currentUser().id })
        .then(res => {
          if (res.data.ok) {
            toast.success("Product created successfully");
            navigate("/seller/products")
          } else toast(res.data.message);
        })
        .catch(e => {
          toast.error(e.response.data.message || e.message);
        });
    } else toast.error("Fill all required fields");
  };

  return (
    <>
      <Products />

      <FormModal
        isOpen
        onClose={() => navigate("/seller/products")}
        title="Create Product"
        submitText="Create Product"
        onSubmit={onProductSubmit}
      >
        <ProductFields ref={productRef} />
      </FormModal>
    </>
  );
};

export default CreateProducts;
