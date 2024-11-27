import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../Redux/Slices/CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Redux/Slices/WishListSlice";

const ProductsList = ({ products }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [minPrice, setMinPrice] = useState(0); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState(Infinity); // Maximum price filter
  const [category, setCategory] = useState("All"); // Category filter

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    dispatch(addtoCart(product));
  };

  // Handle toggling a product in the wishlist
  const handleToggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // Full and empty stars for rating
  const fullStar = (
    <FontAwesomeIcon
      icon={faStar}
      style={{ color: "#FFFF00", fontSize: "0.7rem" }}
    />
  );
  const emptyStar = (
    <FontAwesomeIcon
      icon={faStar}
      style={{ color: "black", fontSize: "0.7rem" }}
    />
  );

  // Filter products based on search term, price range, and category
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        product.price >= minPrice && product.price <= (maxPrice || Infinity)
    )
    .filter((product) => {
      if (category === "All") return true;
      if (category === "Tops" && product.category === "Tops") return true;
      if (category === "Bottoms" && product.category === "Bottoms") return true;
      return false;
    });

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
          style={{ maxWidth: "300px", marginRight: "10px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: "150px", marginRight: "10px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="form-control"
          style={{ maxWidth: "150px", marginRight: "10px" }}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="form-control"
          style={{ maxWidth: "150px" }}
          value={maxPrice === Infinity ? "" : maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : Infinity)
          }
        />
      </div>

      {/* Product Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const discountPercentage =
              product.originalPrice && product.price
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )
                : null;

            // Check if product is already in the wishlist
            const isInWishlist = wishlist.some(
              (item) => item.id === product.id
            );

            return (
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
                    <span
                      className={`badge ${
                        product.inStock ? "bg-success" : "bg-danger"
                      } position-absolute top-0 start-0 m-2`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    {discountPercentage && (
                      <span className="badge bg-warning position-absolute top-0 end-0 m-2">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.title.slice(0, 23)}</Card.Title>
                    <Card.Text className={styles.shop}>
                      {product.description.slice(0, 50)}
                    </Card.Text>
                    <Card.Text className={styles.price}>
                      <span className="text-primary me-2">Price:</span>
                      {product.price}$
                      {product.originalPrice && (
                        <span className="text-muted ms-2 text-decoration-line-through">
                          {product.originalPrice}$
                        </span>
                      )}
                    </Card.Text>
                    <span className={styles.rate}>Rating:</span>
                    <Rating
                      initialRating={product.rating.rate}
                      emptySymbol={emptyStar}
                      fullSymbol={fullStar}
                      readonly
                    />
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <Link
                        className={styles.view}
                        to={`/shop/${product.id}`}
                        state={{ product }}
                      >
                        View Details
                      </Link>
                      <div
                        onClick={() => handleToggleWishlist(product)}
                        style={{ cursor: "pointer" }}
                      >
                        {isInWishlist ? (
                          <FaHeart className="text-danger" size={25} />
                        ) : (
                          <FaRegHeart className="text-muted" size={25} />
                        )}
                      </div>
                      <HiShoppingCart
                        size={40}
                        className={`${product.inStock ? "" : "text-muted"}`}
                        onClick={() =>
                          product.inStock && handleAddToCart(product)
                        }
                        style={{
                          cursor: product.inStock ? "pointer" : "not-allowed",
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
