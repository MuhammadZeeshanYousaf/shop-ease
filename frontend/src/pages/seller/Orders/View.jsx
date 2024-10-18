import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../components/ui/Modal";

function View() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <Modal isOpen onClose={() => navigate("/seller/orders")} title="View Order">
      <div>{orderId}</div>
    </Modal>
  );
}

export default View;
