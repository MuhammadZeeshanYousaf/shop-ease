import { useNavigate } from "react-router-dom";
import FormModal from "../../../components/ui/FormModal";
import ProductFields from "./ProductFields";
import { useRef } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";

const CreateProduct = () => {
  const navigate = useNavigate();
  const productRef = useRef();

  const onProductSubmit = e => {
    e.preventDefault();
    const data = productRef.current.product;
    if (data.name && data.price) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("image", data.image);

      api
        .post(
          "/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(res => {
          if (res.data.ok) {
            toast.success("Product created successfully");
            navigate("/seller/products", { state: { reload: true } });
          } else toast(res.data.message);
        })
        .catch(e => {
          console.error(e.response?.data?.message || e.message);
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
