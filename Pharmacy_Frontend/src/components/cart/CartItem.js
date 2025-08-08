import React from "react";

const CartItem = ({ item, handleRemoveItem, handleUpdateQuantity }) => {
  return (
    <tr>
      <td>{item.product.name}</td>
      <td>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) =>
            handleUpdateQuantity(item._id, e.target.valueAsNumber)
          }
        />
      </td>
      <td>{item.product.price}</td>
      <td>{item.product.price * item.quantity}</td>
      <td>
        <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
      </td>
    </tr>
  );
};

export default CartItem;
