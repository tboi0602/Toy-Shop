import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import BackgroundContent from "../assets/picture1.jpg";
import picture2 from "../assets/picture2.png";
import picture3 from "../assets/picture3.png";
import picture4 from "../assets/picture4.png";
import picture5 from "../assets/picture5.png";
import picture6 from "../assets/picture6.png";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [picture3, picture4, picture5];

const LoadingPage = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const nextSlide = () => setIndex((index + 1) % images.length);
  const prevSlide = () => setIndex((index - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setTimeout(nextSlide, 2500);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <>
      <div className="sticky top-0 z-10">
        <Header />
      </div>

      {/* Slide Show */}
      <div className="w-full center flex-col bg-white py-10">
        <p className="text-red-600 font-bold text-4xl text-center">Produits phares</p>
        <p className="text-gray-600 text-lg mt-2 text-center">
          Discover our most popular and highly recommended items!
        </p>
        <div className="relative w-full max-w-7xl h-auto min-h-[250px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl shadow-lg mt-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt="Slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full object-contain"
            />
          </AnimatePresence>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-md"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-md"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Nội dung */}
      <div className="py-16 px-6 md:px-12 lg:px-32 space-y-24 bg-gray-50">
        {/* Background and about*/}
        <div className="w-full space-y-6">
          <img
            src={BackgroundContent}
            alt="Store Background"
            className="w-full max-h-[600px] object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-5xl font-bold text-red-600">About Our Store</h2>
            <p className="text-lg text-gray-700">
              Welcome to our store – your go-to destination for quality,
              variety, and affordability. We are committed to delivering
              excellent products, friendly service, and a shopping experience
              that keeps you coming back.
            </p>
            <p className="text-lg text-gray-700">
              With years of experience in the market, we continuously evolve to
              meet our customers’ changing needs, providing both in-store and
              online solutions to serve you better.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="space-y-6 col-span-1 text-center md:text-left">
            <h2 className="text-5xl font-bold text-red-600 flex items-center gap-2">
              <Package className="w-10 h-10 text-red-600" />
              Products Available
            </h2>
            <p className="text-lg text-gray-700">
              Discover a wide range of high-quality, affordable products
              available year-round. Our inventory is updated regularly to meet
              all your daily and seasonal needs.
            </p>
            <div className="mt-6" onClick={()=>navigate("/login")}>
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-xl shadow-md transition">
                Explore Products
              </button>
            </div>
          </div>
          <img
            src={picture2}
            alt="Available Products"
            className="col-span-2 w-full max-w-full rounded-lg shadow-md object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <img
            src={picture6}
            alt="Product Variety"
            className="w-full col-span-2 max-w-full rounded-lg shadow-md object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="space-y-6 col-span-1 text-center md:text-left">
            <h2 className="text-5xl font-bold text-red-600">Product Variety</h2>
            <p className="text-lg text-gray-700">
              We offer over 2,000 different products ranging from household
              essentials to exclusive imports. You will always find something
              new and exciting on our shelves.
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <p className="text-xl italic text-gray-700">
            “Best store in town! Excellent service and great prices.”
          </p>
          <p className="mt-4 font-semibold text-red-600">– ありがとう, loyal customer</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoadingPage;