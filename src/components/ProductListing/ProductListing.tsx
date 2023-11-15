import React, { useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartItem, Data } from "../../types";

interface ProductListingProps {
  fetchProducts: () => void;
  products: Data[];
  loading: boolean;
  error: string | null;
  addToCart: (item: Data) => void;
  removeFromCart: (itemId: number) => void;
  decrementQuantity: (itemId: number) => void;
  cartItems: CartItem[];
  selectedColor: string;
}

const ProductListing: React.FC<ProductListingProps> = ({
  fetchProducts,
  products,
  loading,
  error,
  addToCart,
  removeFromCart,
  decrementQuantity,
  cartItems,
  selectedColor,
}) => {
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleQuantityChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    const product = {
      ...(products.find((product) => product.id === productId) as Data),
    };
    if (product) {
      if (e.currentTarget.id === "decrement") {
        decrementQuantity(product.id);
      } else if (e.currentTarget.id === "increment") {
        addToCart(product);
      }
    }
  };

  const handleDelete = (productId: number) => {
    removeFromCart(productId);
  };

  const isItemEqualsZero = (productId: number) => {
    const itemInCart = cartItems.find((item) => item.id === productId);
    return itemInCart ? (itemInCart.quantity === 0 ? true : false) : true;
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-container">
      {products
        .filter(
          (product) =>
            selectedColor === "All" || product.colour === selectedColor
        )
        .map((product, index) => (
          <div className="product-card" key={index} data-testid="product-card">
            <div className="image-container">
              <img
                src={product.img}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">Price: ${product.price}</p>
            </div>

            <div className="quantity-container">
              <div className="quantity-row-1">
                <button
                  onClick={(e) => handleQuantityChange(e, product.id)}
                  id="decrement"
                  data-testid="decrement-1"
                  className="quantity-button"
                  disabled={isItemEqualsZero(product.id)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                {cartItems.find((item) => item.id === product.id)
                  ? cartItems.find((item) => item.id === product.id)?.quantity
                  : `0`}
                <button
                  onClick={(e) => handleQuantityChange(e, product.id)}
                  id="increment"
                  data-testid="add-to-cart-1"
                  className="quantity-button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="quantity-row-2">
                <button
                  disabled={isItemEqualsZero(product.id)}
                  onClick={() => handleDelete(product.id)}
                  className="delete-button"
                  data-testid="remove-1"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductListing;
