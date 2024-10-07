import { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../utils/api";

const categories = [
  { id: 1, name: "Electronics", image: "https://picsum.photos/200/300" },
  { id: 2, name: "Fashion", image: "https://picsum.photos/200/301" },
  { id: 3, name: "Home and Kitchen", image: "https://picsum.photos/200/302" },
  { id: 4, name: "Beauty and Personal", image: "https://picsum.photos/200/303" },
  { id: 5, name: "Sports and Outdoors", image: "https://picsum.photos/200/304" },
];

const bannerImages = [
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1517635676447-3a480fbfd8f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Home = () => {
  const [hotProducts, setProducts] = useState([]);

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    api
      .get("/products")
      .then(res => {
        if (res.data.ok) {
          setProducts(res.data.data);
        }
      })
      .catch(err => {
        console.error(err.response.message || err.message);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <Slider {...slickSettings}>
          {bannerImages.map((bannerImg, i) => (
            <img key={i} src={bannerImg} alt="Products banner" className="w-full h-80 object-cover rounded" />
          ))}
        </Slider>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap justify-center">
          {categories.map(category => (
            <div key={category.id} className="w-1/2 md:w-1/3 lg:w-1/5 p-4">
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
              <h3 className="text-lg font-bold mt-4">{category.name}</h3>
              <button className="mt-3 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                View products
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Hot products</h2>
        <div className="flex flex-wrap justify-center">
          {hotProducts.map(product => (
            <div key={product.id} className="w-1/2 md:w-1/3 lg:w-1/3 p-4">
              <div className="border rounded-lg shadow-lg overflow-hidden">
                {/* Card Content */}
                <div>
                  <img src={product.image} className="w-full h-48 object-cover" />
                </div>
                {/* Card Header */}
                <div className="p-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-gray-600">Price: ${product.price}</p>
                </div>
                {/* Card Footer */}
                <div className="p-2 text-right">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <i className="fa fa-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
