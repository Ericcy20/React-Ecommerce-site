import React from "react";
import ProductsList from "../ProductsList/ProductList";
import LoaderComponent from "../Loader/Loader";
import products from "../../products.json"; // Import the JSON file

const Shop = () => {
  const isloading = false; // Set to `false` since JSON data is static
  const error = null; // No error expected for static data

  return (
    <>
      <LoaderComponent isloading={isloading} error={error} />
      <ProductsList products={products} />
    </>
  );
};

export default Shop;
