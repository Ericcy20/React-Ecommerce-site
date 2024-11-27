import React, { useState, useEffect, useRef } from "react";
import "../Caroussel/Carousel.css";
import products from "../../data/product.json";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInterval = useRef(null);

  const startAutoScroll = () => {
    carouselInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (carouselInterval.current) {
      clearInterval(carouselInterval.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const nextSlide = () => {
    stopAutoScroll();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    startAutoScroll();
  };

  const prevSlide = () => {
    stopAutoScroll();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
    startAutoScroll();
  };

  return (
    <div
      className="carousel-container"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <button
        className="carousel-btn prev-btn"
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        &#10094;
      </button>

      <div
        className="carousel-wrapper"
        style={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="carousel-item"
            style={{
              minWidth: "100%",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>

      <button
        className="carousel-btn next-btn"
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
