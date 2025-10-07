import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

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
    <div className="py-20  mt-4 px-4">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
