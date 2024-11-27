import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./HeroSection.css"; // Assuming the CSS file is named HeroSection.css

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p className={styles.tagline}>SUMMER BIKINI COLLECTION</p>
          <h1 className={styles.title}>Save Up to 50% This Weekend Only</h1>
          <Button  className="btn glass">
            <Link to="./shop" >
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
