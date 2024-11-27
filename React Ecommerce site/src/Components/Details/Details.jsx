import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../Redux/Slices/CartSlice";
import { HiShoppingCart } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Details.css"; // Ensure this file matches the styles below

const Details = () => {
  const location = useLocation();
  const product = location.state?.product;
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fullStar = (
    <FontAwesomeIcon
      icon={faStar}
      style={{ color: "#FFD700", fontSize: "0.9rem" }}
    />
  );

  const emptyStar = (
    <FontAwesomeIcon
      icon={faStar}
      style={{ color: "#D3D3D3", fontSize: "0.9rem" }}
    />
  );

  // Function to display the rating stars based on product rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const emptyStars = 5 - fullStars; // The remaining stars are empty

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(fullStar); // Push full stars
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(emptyStar); // Push empty stars
    }

    return stars.map((star, index) => <span key={index}>{star}</span>);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size before adding to cart.");
      return;
    }

    const cartItem = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity, // Make sure to include quantity when adding to cart
    };

    dispatch(addtoCart(cartItem)); // Dispatching the action with the product details and quantity
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="details-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home &gt; Short Description</span>
      </div>

      {/* Product Main Section */}
      <div className="details-main">
        {/* Product Images Section */}
        <div className="details-images">
          <div className="image-thumbnails">
            {[product.image, product.image, product.image].map((img, index) => (
              <img key={index} src={img} alt={`Thumbnail ${index}`} />
            ))}
          </div>
          <div className="main-image">
            <img src={product.image} alt={product.title} />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-details">
          <h2>{product.title.toUpperCase()}</h2>
          <p className="sku">SKU: {product.id}</p>
          <p className="availability">
            {product.inStock ? (
              <span style={{ color: "green" }}>In Stock</span>
            ) : (
              <span style={{ color: "red" }}>Out of Stock</span>
            )}
          </p>
          <p className="price">
            <del>${product.originalPrice}</del> <span>${product.price}</span>{" "}
            (You Save <span>${product.originalPrice - product.price}</span>)
          </p>
          <div className="sold-info">🔥 5 sold in last 26 hours</div>
          <p className="description">{product.description}</p>

          {/* Rating Section */}
          <div className="rating-section">
            <h4>Rating:</h4>
            <div className="stars">
              {renderStars(product.rating)} {/* Display the rating stars */}
            </div>
          </div>

          {/* Color Selection */}
          <div className="color-selection">
            <h4>COLOR:</h4>
            {["Red", "Black", "Blue", "Green"].map((color) => (
              <span
                key={color}
                className={`color-option ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
              ></span>
            ))}
          </div>

          {/* Size Selection */}
          <div className="size-selection">
            <h4>SIZE:</h4>
            {["XS", "S", "M", "L"].map((size) => (
              <span
                key={size}
                className={`size-option ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </span>
            ))}
          </div>

          {/* Quantity Selection */}
          <div className="quantity-selection">
            <button onClick={() => setQuantity((q) => Math.max(q - 1, 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          {/* Add to Cart Button */}
          <div className="add-to-cart">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <HiShoppingCart /> Add to Cart
            </button>
            <button className="buy-now-btn">Buy It Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
