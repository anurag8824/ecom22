import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import ImageDiv from "./ImageDiv";

const SubCategoryList = () => {
  const { categoryId } = useParams(); // ✅ get :categoryId from route
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ API call using fetch
  const getSubCategoriesByCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/subcategories/category/${categoryId}`);
      console.log(response, "response");
      if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
      }
      const result = await response.json();
      return result.data; // assuming backend returns { data: [...] }
    } catch (error) {
      throw new Error(`Error fetching subcategories: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const subCategoriesData = await getSubCategoriesByCategory(categoryId);
        setSubCategories(subCategoriesData);
        console.log(subCategoriesData, "subCategoriesData");
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchSubCategories();
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-20  mt-4 ">
   

      <ImageDiv src={"https://rukminim3.flixcart.com/fk-p-flap/780/108/image/06d7d6cc488d4f2f.jpg?q=60"}/>

      <ImageDiv src={"https://rukminim3.flixcart.com/fk-p-flap/780/108/image/97194f4d7d713631.jpg?q=60"}/>
      <HomeCarousel images={homeCarouselData} />

      <ImageDiv src={"https://rukminim3.flixcart.com/fk-p-flap/780/173/image/19d2300fdc9dcf78.jpg?q=60"}/>
      
      <div style={{background: "linear-gradient(rgb(57, 0, 183), rgb(57, 0, 183))"}} className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-2 py-2">
        {subCategories?.map((sub) => (
          <Link
          to={`/from-subcategory/${sub._id}`}
            key={sub._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={sub.image}
              alt={sub.name}
              className="w-full h-40 object-contain"
            />
            <div className="p-2 text-center">
              <span className="text-sm font-semibold">{sub.name}</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default SubCategoryList;
