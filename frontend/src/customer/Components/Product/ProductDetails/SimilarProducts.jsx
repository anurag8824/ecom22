import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import HomeProductSection from "../customer/Components/Home/HomeProductSection";

import { API_BASE_URL } from "../../../../config/api";

const SimilarProducts = ({subcategoryId}) => {
    // ✅ get :categoryId from route
      const [subCategories, setSubCategories] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      console.log("subcategoryId:", subcategoryId);
    
    
      // ✅ API call using fetch
      const getSubCategoriesByCategory = async (subcategoryId) => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/products/subcategory/${subcategoryId}`);
          console.log(response, "");
          if (!response.ok) {
            throw new Error("Failed to fetch subcategories");
          }
          const result = await response.json();
          console.log(result, "responsehvgcfgjhcfghjc");
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
    <div className="grid grid-cols-2 gap-4">
            {subCategories?.map((item, index) => (
              <a href={`/product/${item?._id}`}  key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img src={item?.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <p className="text-sm text-gray-900 font-medium truncate">{item?.brand}</p>
                  <p className="text-xs text-gray-600 truncate mb-2">{item?.title}</p>
                  <p className="text-sm font-bold text-gray-900">₹{item?.discountedPrice}</p>
                  <p className="text-xs text-gray-500 line-through">₹{item?.price}</p>
                </div>
              </a>
            ))}
          </div>
  )
}

export default SimilarProducts