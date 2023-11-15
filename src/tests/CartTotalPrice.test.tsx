import { render } from "@testing-library/react";
import {CartTotalPrice} from "../components";

describe("CartTotalPrice Component", () => {
  it("displays the total price as €0.00 when the cart is empty", () => {
    const { getByText } = render(<CartTotalPrice cartItems={[]} />);
    const totalPrice = getByText("Total: 0.00 💰");
    expect(totalPrice).toBeInTheDocument();
  });

  it("displays the correct total price for items in the cart", () => {
    const cartItems = [
      { id: 1, name: "Item 1", price: 10, quantity: 2 },
      { id: 2, name: "Item 2", price: 15, quantity: 3 },
    ];

    const { getByText } = render(<CartTotalPrice cartItems={cartItems} />);
    const totalPrice = getByText("Total: 65.00 💰");
    expect(totalPrice).toBeInTheDocument();
  });

});
