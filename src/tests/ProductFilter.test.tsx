import { render, fireEvent } from "@testing-library/react";
import { ProductFilter } from "../components";
import { Data } from "../types";

describe("ProductFilter Component", () => {
  it("changes color selection", () => {
    const products = [
      { id: 1, name: "string", price: 1, colour: "Red", img: "img" },
      { id: 2, name: "string", price: 2, colour: "Blue", img: "img" },
    ];
    const handleColorChange = jest.fn();

    const { getByTestId } = render(
      <ProductFilter
        products={products}
        handleColorChange={handleColorChange}
        loading={false}
        error={null}
      />
    );

    const colorFilterSelect = getByTestId("color-filter") as HTMLSelectElement;

    fireEvent.change(colorFilterSelect, { target: { value: "Blue" } });

    expect(handleColorChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "Blue" }),
      })
    );
  });

  it("displays loading message", () => {
    const products: Data[] = [];
    const handleColorChange = jest.fn();

    const { getByText } = render(
      <ProductFilter
        products={products}
        handleColorChange={handleColorChange}
        loading={true}
        error={null}
      />
    );

    const loadingMessage = getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });
});
