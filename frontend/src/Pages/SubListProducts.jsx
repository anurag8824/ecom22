import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";

const SubListProducts = () => {
  const { subcategoryId } = useParams(); // ✅ get :categoryId from route
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // ✅ API call using fetch
  const getSubCategoriesByCategory = async (subcategoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/subcategory/${subcategoryId}`);
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
        const subCategoriesData = await getSubCategoriesByCategory(subcategoryId);
        setSubCategories(subCategoriesData);
        console.log(subCategoriesData, "subCategoriesData");
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (subcategoryId) fetchSubCategories();
  }, [subcategoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-20  mt-4 px-1">
      
      <HomeProductSection
            //   key={category._id}
              data={subCategories}
            //   section={category.name}
            />
    </div>
  );
};

export default SubListProducts;
