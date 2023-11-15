import React, { useState } from "react";
import ProductListing from "../ProductListing";
import ProductFilter from "../ProductFilter";
import CartTotalPrice from "../CartTotalPrice";
import "./index.css";
interface ProductCardProps {}

const ProductCard: React.FC<ProductCardProps> = () => {
  const [selectedColor, setSelectedColor] = useState("All");

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="container">
      <ProductFilter
        handleColorChange={handleColorChange}
      />
      <ProductListing selectedColor={selectedColor} />
      <CartTotalPrice />
    </div>
  );
};

export default ProductCard;
