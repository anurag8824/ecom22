import React, { useState, useEffect } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { API_BASE_URL } from "../config/api";
import { Link } from "react-router-dom";
import Home4block3 from "../Pages/Home4block3";
import Home4block2 from "../Pages/Home4block2";
import Home4block from "../Pages/Home4block";




const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);


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

  const getAllSubCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/subcategories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const result = await response.json();
      return result.data; // Extract the data array from the response
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const subCategoriesData = await getAllSubCategories();
        setSubCategories(subCategoriesData); // ✅ store data in state

        console.log(subCategoriesData, "subcategoriesData");
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);









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
        const featuredCategories = categoriesData // Limit to first 4 categories

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
  console.log(categories, "categoriess")


  const banners = [
    {
      src: "https://rukminim3.flixcart.com/fk-p-flap/143/185/image/702b2eda36e09053.jpg?q=60",
      alt: "banner",
      link: "/from-subcategory/68e69787eed6eb3957c8c8ee"
    },
    {
      src: "https://rukminim3.flixcart.com/fk-p-flap/143/185/image/26cc3e0fd60489f5.jpg?q=60",
      alt: "banner",
      link: "/from-subcategory/68e68712eed6eb3957c8c418"
    },
    {
      src: "https://rukminim3.flixcart.com/fk-p-flap/143/185/image/c93a4de0c0119508.jpg?q=60",
      alt: "banner",
      link: "sub-category-list/68e4e84bfadd326202b97dbe"
    },
  
    {
      src: "https://rukminim3.flixcart.com/fk-p-flap/143/185/image/f7641aaca46d117d.jpg?q=60",
      alt: "banner",
      link: "/from-subcategory/68e688b5eed6eb3957c8c4ae"
    },
    {
      src: "https://rukminim3.flixcart.com/fk-p-flap/143/185/image/6c143d8d948ca743.jpg?q=60",
      alt: "banner",
      link: "/from-subcategory/68e506affadd326202b984ec"
    }
  ];


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

      {/* Top Best trending categories  */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 p-4">
        {banners?.map((banner, index) => (
          <Link key={index} to={banner.link}>
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-auto rounded-lg shadow"
            />
          </Link>
        ))}
      </div>

      <div>
        <img className="w-full" src=" https://rukminim3.flixcart.com/fk-p-flap/780/108/image/322bfa268d54d167.jpg?q=60" />
      </div>

      



    


      <div className="my-8 py-10 bg-gray-50 hidden">
  <div className="max-w-6xl mx-auto px-4">

    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-items-center">
      {subCategories?.map((sub) => (
        <Link
          to={`/from-subcategory/${sub._id}`}
          key={sub._id}
          className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 w-[140px] h-[180px] flex flex-col items-center overflow-hidden hover:-translate-y-1"
        >
          <div className="w-full h-[100px] overflow-hidden">
            <img
              src={sub.image}
              alt={sub.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-2 text-center flex-1 flex flex-col justify-center">
            <span className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {sub.name}
            </span>
            {/* {sub.category && sub.category[0]?.name && (
              <p className="text-[10px] text-gray-500 mt-1">
                {sub.category[0].name}
              </p>
            )} */}
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>








      <div>
        <img className="w-full" src="https://rukminim3.flixcart.com/fk-p-flap/780/108/image/a5c59bcd87f8faf4.jpg?q=60" />
      </div>
      

      <div className="space-y-10 my-2 py-20">
        {categories?.map((category) => {
          const products = productsByCategory[category._id];
          console.log(products, "products of category", categories);

          // Only render section if products exist for this category
          if (!products || products.length === 0) return null;

          return (
            <>
            
      <div>
      <img style={{height: "90px"}} className="w-full" src="https://redtape.com/cdn/shop/files/logo.png?v=1704870276&width=360" />
        <img className="w-full" src="/REDTAPE.png" />
      </div>
            <HomeProductSection
              key={category._id}
              data={products}
              section={category.name}
            />
            </>
          );
        })}

        {/* Fallback message if no categories/products */}
        {categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        )}
      </div>




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





      <div className="space-y-10 my-2 py-20 hidden">

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <Link to={`/sub-category-list/${category._id}`}
              key={category._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full"
              />
              <div className="p-1 text-center">
                <span className="text-xs font-semibold">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>


      </div>

      <div className="space-y-10 my-2 py-20">

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          {subCategories?.map((sub) => (
            <Link
              to={`/from-subcategory/${sub._id}`}
              key={sub._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-1 text-center">
                <span className="text-xs font-semibold">{sub.name}</span>
                {/* optional: show parent category name if you want */}
                {sub.category && sub.category[0]?.name && (
                  <p className="text-[10px] text-gray-500 mt-1">
                    {sub.category[0].name}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>





    </div>
  );
};

export default Homepage;