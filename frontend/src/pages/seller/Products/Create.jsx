import { useNavigate } from "react-router-dom";
import FormModal from "../../../components/ui/FormModal";
import ProductFields from "./ProductFields";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";

const CreateProduct = () => {
  const navigate = useNavigate();
  const productRef = useRef();
  const [loading, setLoading] = useState(false);

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
        .post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          if (res.data.ok) navigate("/seller/products", { state: { reload: true } });
          return res;
        })
        .finally(() => setLoading(false));

      // Toaster for each status
      toast.promise(apiPromise, {
        loading: "Creating product...",
        success: res => res.data.message,
        error: e => e.response?.data?.message ?? e.message,
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
        loading={loading}
      >
        <ProductFields ref={productRef} />
      </FormModal>
    </>
  );
};

export default CreateProduct;
