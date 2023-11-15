import { connect } from "react-redux";
import { RootState } from "../../reducers";
import {
  selectCartItems,
} from "../../selectors";
import CartTotalPrice from "./CartTotalPrice";

const mapStateToProps = (state: RootState) => {
  return {
    cartItems: selectCartItems(state),
  };
};

const CartTotalPriceContainer = connect(
  mapStateToProps,
)(CartTotalPrice);

export default CartTotalPriceContainer;
