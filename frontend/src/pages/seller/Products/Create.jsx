import { useNavigate } from "react-router-dom";
import FormModal from "../../../components/ui/FormModal";
import ProductFields from "./ProductFields";
import { useRef } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

const CreateProduct = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const productRef = useRef();

  const onProductSubmit = e => {
    e.preventDefault();
    const data = productRef.current.product;
    if (data.name && data.price) {
      api
        .post("/products", { ...data, image: data.image?.name, user: currentUser().id })
        .then(res => {
          if (res.data.ok) {
            toast.success("Product created successfully");
            navigate("/seller/products", { state: { reload: true } });
          } else toast(res.data.message);
        })
        .catch(e => {
          console.error(e.response.data?.message || e.message);
        });
    } else toast.error("Fill all required fields");
  };

  return (
    <>
      <FormModal
        isOpen
        onClose={() => navigate("/seller/products")}
        title="Create Product"
        submitText="Create"
        onSubmit={onProductSubmit}
      >
        <ProductFields ref={productRef} />
      </FormModal>
    </>
  );
};

export default CreateProduct;
