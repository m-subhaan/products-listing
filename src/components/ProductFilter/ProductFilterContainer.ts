import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { selectProducts,selectLoading,selectError } from "../../selectors";
import ProductFilter from "./ProductFilter";

const mapStateToProps = (state: RootState) => {
  return {
    products: selectProducts(state),
    loading: selectLoading(state),
    error: selectError(state),
  };
};

const ProductFilterContainer = connect(
  mapStateToProps,
)(ProductFilter);

export default ProductFilterContainer;
