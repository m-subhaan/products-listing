import { connect } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../reducers";
import { fetchProducts } from "../../reducers/productsSlice";
import {
  addToCart,
  removeFromCart,
  decrementQuantity,
} from "../../reducers/cartSlice";
import { selectProducts, selectLoading, selectError, selectCartItems } from "../../selectors";
import ProductListing from "./ProductListing";
import { Data } from "../../types";

const mapStateToProps = (state: RootState) => {
  return {
    products: selectProducts(state),
    loading: selectLoading(state),
    error: selectError(state),
    cartItems: selectCartItems(state)
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (item:Data ) => dispatch(addToCart(item)),
    removeFromCart: (itemId: number) => dispatch(removeFromCart(itemId)),
    decrementQuantity: (itemId: number) => dispatch(decrementQuantity(itemId)),
  };
};

const ProductListingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListing);

export default ProductListingContainer;
