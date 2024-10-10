import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import Modal from "../../../components/ui/Modal";

function DeleteProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const onConfirmDelete = () => {
    if (productId) {
      api
        .delete(`/products/${productId}`)
        .then(res => {
          if (res.data.ok) {
            toast.success(res.data.message);
            navigate("/seller/products", { state: { reload: true } });
          } else toast(res.data.message);
        })
        .catch(e => {
          console.error(e.response.data.message || e.message);
        });
    } else toast.error("Invalid product");
  };

  return (
    <>
      <Modal isOpen hideCloseBtn onClose={() => navigate("/seller/products")} title="Are you sure to delete this product?">
        <div className="flex justify-end items-end gap-5 mt-10">
          <button onClick={onConfirmDelete} className="btn bg-rose-500 hover:bg-rose-600">
            Delete
          </button>
          <Link to="/seller/products" className="btn">
            Cancel
          </Link>
        </div>
      </Modal>
    </>
  );
}

export default DeleteProduct;
