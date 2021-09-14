import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>Sorry, you're a fucking cunt.</h5>
    );
  }
  if (!gridView) {
    return <ListView products={filteredProducts} />;
  }
  return <GridView products={filteredProducts}>product list</GridView>;
};

export default ProductList;
