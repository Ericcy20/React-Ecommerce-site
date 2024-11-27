import Brands from "../Brands/Brands";
import Carousel from "../Caroussel/Carousel"
import Footer from "../Footer/Footer";
import BlogSection from "../Blogcomponent/BlogSection";
import products from "../../../src/data/product.json";
import Services from "../Services/Services";
import Newsletter from "../Newsletter/Newsletter"
import HeroSection from "../HeroSection/HeroSection";
const Home = () => {
  return (
    <div>
      <div className="hero">
  <HeroSection/>
  </div>
<br/>
<br/>
      <BlogSection />
      <div className="parallax">
        <Brands />
      </div>
      <div>
       <Carousel  products={products} />
       </div>
       <br/>

       <Services/>
       <Newsletter/>
       <br/>
       <br/>
      <Footer />
    </div>
  );
};
export default Home;
