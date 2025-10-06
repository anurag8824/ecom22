import React, { useState, useEffect } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { API_BASE_URL } from "../config/api";
import Home4block from "./Home4block";
import Home4block2 from "./Home4block2";
import Home4block3 from "./Home4block3";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API functions (you can move these to a separate service file)
  const getProductsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/category/${categoryId}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      throw new Error(`Error fetching products by category: ${error.message}`);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const result = await response.json();
      return result.data; // Extract the data array from the response
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all categories
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);

        // Fetch products for each category
        const productsData = {};

        // You can limit to specific categories or fetch all
        // For better performance, consider fetching only featured categories
        const featuredCategories = categoriesData.slice(0, 4); // Limit to first 4 categories

        for (const category of featuredCategories) {
          try {
            const products = await getProductsByCategory(category._id);
            productsData[category._id] = products;
          } catch (err) {
            console.error(`Error fetching products for category ${category.name}:`, err);
          }
        }

        setProductsByCategory(productsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }
  console.log(categories,"categoriess")

  return (
    <div className="">
      <div>
        <img className="w-full" src="https://rukminim3.flixcart.com/fk-p-flap/780/108/image/06d7d6cc488d4f2f.jpg?q=60" />
      </div>


      <div>
        <img className="w-full" src="https://rukminim3.flixcart.com/fk-p-flap/780/108/image/97194f4d7d713631.jpg?q=60" />
      </div>
      <HomeCarousel images={homeCarouselData} />

      <div>
        <img src="	https://rukminim3.flixcart.com/fk-p-flap/1558/135/image/fe8aef563bbd1231.jpg?q=60" />
      </div>




      <div className="hidden md:block">
        <img src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60" />
      </div>






      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 p-4">
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/143/185/image/a1a2e3849ba7feb8.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/143/185/image/55c7f71351a92130.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="	https://rukminim3.flixcart.com/fk-p-flap/143/185/image/c93a4de0c0119508.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/143/185/image/b021c7b6849d1a25.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="	https://rukminim3.flixcart.com/fk-p-flap/143/185/image/6c143d8d948ca743.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="	https://rukminim3.flixcart.com/fk-p-flap/143/185/image/8ea4f46898f03b83.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="	https://rukminim3.flixcart.com/fk-p-flap/143/185/image/5dbf838835a264e2.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/143/185/image/f7641aaca46d117d.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/143/185/image/92df6945be8b0a92.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
      </div>

      <div>
        <img className="w-full" src=" https://rukminim3.flixcart.com/fk-p-flap/780/108/image/322bfa268d54d167.jpg?q=60" />
      </div>

      <div>
        <img className="w-full" src="https://rukminim3.flixcart.com/fk-p-flap/780/173/image/0a9751c6915b8884.jpg?q=60" />
      </div>

      <Home4block />


      <div>
        <img className="w-full" src="https://rukminim3.flixcart.com/fk-p-flap/780/173/image/26d3f957d73c7fe3.jpg?q=60" />
      </div>
      <Home4block2 />


      <div>
        <img className="w-full" src="https://rukminim3.flixcart.com/fk-p-flap/780/108/image/a5c59bcd87f8faf4.jpg?q=60" />
      </div>

      <Home4block3 />




      <div className="griddd hidden grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
        <img
          src="https://rukminim3.flixcart.com/fk-p-flap/1558/224/image/41fc5c22a3d4101c.jpg?q=60"
          alt="banner"
          className="w-full h-auto rounded-lg shadow"
        />
      </div>


      <div className="space-y-10 py-20">
        {categories.map((category) => {
          const products = productsByCategory[category._id];

          // Only render section if products exist for this category
          if (!products || products.length === 0) return null;

          return (
            <HomeProductSection
              key={category._id}
              data={products}
              section={category.name}
            />
          );
        })}

        {/* Fallback message if no categories/products */}
        {categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;