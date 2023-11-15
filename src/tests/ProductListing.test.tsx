import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ProductListing } from "../components";

describe("ProductListing Component", () => {
  it("displays loading spinner", () => {
    const { container } = render(
      <ProductListing
        fetchProducts={jest.fn()}
        products={[]}
        loading={true}
        error={null}
        addToCart={jest.fn()}
        removeFromCart={jest.fn()}
        decrementQuantity={jest.fn()}
        cartItems={[]}
        selectedColor="All"
      />
    );

    const loadingSpinner = container.querySelector(".spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("displays an error message", () => {
    const { getByText } = render(
      <ProductListing
        fetchProducts={jest.fn()}
        products={[]}
        loading={false}
        error="An error occurred"
        addToCart={jest.fn()}
        removeFromCart={jest.fn()}
        decrementQuantity={jest.fn()}
        cartItems={[]}
        selectedColor="All"
      />
    );

    const errorMessage = getByText("An error occurred");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays a list of products", () => {
    const products = [
      { id: 1, name: "string", price: 1, colour: "Red", img: "img" },
      { id: 2, name: "string", price: 2, colour: "Blue", img: "img" },
    ];
    const { getAllByTestId } = render(
      <ProductListing
        fetchProducts={jest.fn()}
        products={products}
        loading={false}
        error={null}
        addToCart={jest.fn()}
        removeFromCart={jest.fn()}
        decrementQuantity={jest.fn()}
        cartItems={[]}
        selectedColor="All"
      />
    );

    const productCards = getAllByTestId("product-card");
    expect(productCards).toHaveLength(products.length);
  });

  it("handles adding a product to the cart", () => {
    const products = [
      { id: 1, name: "string", price: 1, colour: "Red", img: "img" },
      { id: 2, name: "string", price: 2, colour: "Blue", img: "img" },
    ];
    const addToCart = jest.fn();
    const { getAllByTestId } = render(
      <ProductListing
        fetchProducts={jest.fn()}
        products={products}
        loading={false}
        error={null}
        addToCart={addToCart}
        removeFromCart={jest.fn()}
        decrementQuantity={jest.fn()}
        cartItems={[]}
        selectedColor="All"
      />
    );

    const addToCartButtons = getAllByTestId("add-to-cart-1");
    fireEvent.click(addToCartButtons[0]);

    expect(addToCart).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "string", price: 1, colour: "Red", img: "img" })
    );
  });

  it("handles decrementing a product in the cart", () => {
    const products = [
      { id: 1, name: "string", price: 1, colour: "Red", img: "img" },
      { id: 2, name: "string", price: 2, colour: "Blue", img: "img" },
    ];
    const decrementQuantity = jest.fn();
    const { getAllByTestId } = render(
      <ProductListing
        fetchProducts={jest.fn()}
        products={products}
        loading={false}
        error={null}
        addToCart={jest.fn()}
        removeFromCart={jest.fn()}
        decrementQuantity={decrementQuantity}
        cartItems={[{ id: 1, name: "Product 1", price: 10, quantity: 2 }]}
        selectedColor="All"
      />
    );

    const decrementButton = getAllByTestId("decrement-1");
    fireEvent.click(decrementButton[0]);

    expect(decrementQuantity).toHaveBeenCalledWith(1);
  });

  it("handles removing a product from the cart", () => {
    const products = [
      { id: 1, name: "string", price: 1, colour: "Red", img: "img" },
      { id: 2, name: "string", price: 2, colour: "Blue", img: "img" },
    ];
    const removeFromCart = jest.fn();
    const { getAllByTestId } = render(
      <ProductListing
        fetchProducts={jest.fn()}
        products={products}
        loading={false}
        error={null}
        addToCart={jest.fn()}
        removeFromCart={removeFromCart}
        decrementQuantity={jest.fn()}
        cartItems={[{ id: 1, name: "Product 1", price: 10, quantity: 2 }]}
        selectedColor="All"
      />
    );

    const removeButton = getAllByTestId("remove-1");
    fireEvent.click(removeButton[0]);

    expect(removeFromCart).toHaveBeenCalledWith(1);
  });
});
