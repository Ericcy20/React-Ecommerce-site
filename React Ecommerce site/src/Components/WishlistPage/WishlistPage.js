import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../Redux/Slices/WishListSlice";
import { addtoCart } from "../../Redux/Slices/CartSlice"; // Add addtoCart action
import { HiShoppingCart } from "react-icons/hi"; // Add cart icon
import styles from "./WishlistPage.css";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items); // Get wishlist items from Redux
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Handle removing a product from the wishlist
  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
  };

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    const cartItem = { ...product, quantity: 1 }; // Default quantity to 1
    dispatch(addtoCart(cartItem)); // Dispatch action to add to cart
  };

  // Filter wishlist items based on the search term
  const filteredWishlist = wishlist.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Wishlist</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search in wishlist..."
          className="form-control"
          style={{ maxWidth: "400px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Wishlist Items */}
      <div className="row">
        {filteredWishlist.length > 0 ? (
          filteredWishlist.map((product) => (
            <div
              className="col-lg-3 mt-4 col-md-4 col-sm-6 col-xs-12"
              key={product.id}
            >
              <Card className="h-100 d-flex flex-column justify-content-between align-items-between p-2">
                <div className="d-flex p-3 h-100 justify-content-center align-items-center position-relative">
                  <Card.Img
                    src={`${process.env.PUBLIC_URL}/images/${product.image}`}
                    alt={product.title}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.title.slice(0, 23)}</Card.Title>
                  <Card.Text className={styles.price}>
                    <span className="text-primary me-2">Price:</span>
                    {product.price}$
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    {/* Add to Cart Button */}
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddToCart(product)} // Add product to cart
                    >
                      <HiShoppingCart size={20} className="me-2" /> Add to Cart
                    </button>

                    {/* Remove from Wishlist Button */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromWishlist(product)}
                    >
                      Remove
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No products found in the wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
