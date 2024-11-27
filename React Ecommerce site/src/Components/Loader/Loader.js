import React from "react";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner if you're using Bootstrap

const LoaderComponent = ({ isloading, error }) => {
  if (isloading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // You can also return error messages here if needed
  return null;
};

export default LoaderComponent;
