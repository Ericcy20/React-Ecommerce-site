import React from "react";
import styles from "./BlogSection.css"; // Add your CSS styles here

const BlogSection = () => {
  const blogs = [
    {
      image: "../images/img2.jpg", // Replace with your image path
      title: "IT'S ALL ABOUT HOW YOU WEAR It",
      date: "May 02, 2024",
      description:
        "Customizable Tees just for you.........",
      link: "#",
    },
    {
      image: "../images/img3.jpg", // Replace with your image path
      title: "Self customized tees in all colors",
      date: "May 30, 2024",
      description:
        "Its Just about you and your style",
      link: "#",
    },
  ];

  return (
    <section className={`${styles.blogSection} container my-5`}>
      <h2 className="text-center mb-5">LATEST FROM OUR STORES</h2>
      <div className="row">
        {blogs.map((blog, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card border-0">
              <img
                src={blog.image}
                alt={blog.title}
                className="imgs"
              />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="text-muted">{blog.date}</p>
                <p className="card-text">{blog.description}</p>
                <a
                  href={blog.link}
                  className="btn btn-primary btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                >
                  Check It Out
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
