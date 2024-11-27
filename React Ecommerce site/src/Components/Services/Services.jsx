import React from "react";
import styles from "../Services/Services.css"; // Add your CSS styles here
import { FaTruck, FaDollarSign, FaHeadset, FaCreditCard } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaTruck size={40} />,
      title: "FREE SHIPPING & RETURN",
      description: "Free shipping on order with 20% discount and above",
    },
    {
      icon: <FaDollarSign size={40} />,
      title: "MONEY GUARANTEE",
      description: "30 days money back guarantee",
    },
    {
      icon: <FaHeadset size={40} />,
      title: "ONLINE SUPPORT",
      description: "We support online 24/7 on day",
    },
    {
      icon: <FaCreditCard size={40} />,
      title: "SECURE PAYMENTS",
      description: "All payment are Secured and trusted.",
    },
  ];

  return (
    <section className={`${styles.services} text-center py-5`}>
      <div className="container">
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-3" key={index}>
              <div className="mb-3">{service.icon}</div>
              <h5 className="fw-bold">{service.title}</h5>
              <p className="text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
