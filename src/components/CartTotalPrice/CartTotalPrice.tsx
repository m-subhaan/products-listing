import React from "react";
import "./index.css";
import { CartItem } from "../../types";

interface CartTotalPriceProps {
  cartItems: CartItem[];
}

const CartTotalPrice: React.FC<CartTotalPriceProps> = ({
  cartItems,
}) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return <div className="total-price">Total: {totalPrice.toFixed(2)} 💰</div>;
};

export default CartTotalPrice;
