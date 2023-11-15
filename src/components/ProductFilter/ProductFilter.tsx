import React from "react";
import "./index.css";
import { Data } from "../../types";

interface ProductFilterProps {
  products: Data[];
  handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
  error: string | null;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  handleColorChange,
  loading,
  error,
}) => {
  let colors = ["Loading..."]
  if(!loading && !error){
    colors = [
      "All",
      ...Array.from(new Set(products.map((product: Data) => product.colour))),
    ];
  }

  return (
    <div className="filter-container">
      <label htmlFor="color-filter">Filter by color: </label>
      <select id="color-filter" data-testid="color-filter" onChange={handleColorChange}>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
