import axios from "axios";
import { toast } from "react-toastify";

export const deleteItem = (id, onSuccess) => {
  axios
    .delete(`http://localhost:8080/api/inventory/${id}`)
    .then(() => {
      toast.success("Item deleted.");
      if (onSuccess) onSuccess();
    })
    .catch(() => toast.error("Delete failed."));
};

export const reduceStock = (id, quantity, onSuccess) => {
  axios
    .post(
      `http://localhost:8080/api/inventory/${id}/reduce-stock?quantity=${quantity}`
    )
    .then(() => {
      toast.success("Stock reduced.");
      if (onSuccess) onSuccess();
    })
    .catch(() => toast.error("Stock reduction failed."));
};
