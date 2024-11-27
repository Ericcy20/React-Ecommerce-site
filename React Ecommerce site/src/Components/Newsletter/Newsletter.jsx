import React, { useState } from "react";
import styles from "./Newsletter.css"; // Add your CSS styles here

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  function handleInput(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Email validation
    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      alert(`Thank you for subscribing with ${email}`);
      setEmail(""); // Reset email field after successful subscription
    }
  }

  return (
    <section className={`${styles.newsletter} bg-light py-4`}>
      <div className="container text-center">
        <h4 className="fw-bold">SIGN UP FOR NEWSLETTER</h4>
        {/* Display error message if email is invalid */}
        {!isEmailValid && <p className="text-danger">Please enter a valid email address</p>}
        
        <form onSubmit={handleSubmit} className="d-flex justify-content-center mt-3">
          <input
            type="email"
            className="form-control me-2"
            placeholder="Email address"
            style={{ maxWidth: "300px" }}
            value={email}
            onChange={handleInput}
          />
          <button className="btn btn-primary" type="submit">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
