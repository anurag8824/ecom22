import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";
import { getCategories } from "../../../Redux/Customers/Category/Action";
import { getAllSubCategories } from "../../../Redux/Customers/SubCategory/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customersProduct, category, subCategory } = useSelector((store) => store);
  const categories = category.categories?.data || [];
  const subcategories = subCategory.subcategories?.data || [];

  const searchParams = new URLSearchParams(location.search);
  const availabilityParam = searchParams.get("availability") || "";
  const categoryParam = searchParams.get("category") || "";
  const subcategoryParam = searchParams.get("subcategory") || "";
  const sortParam = searchParams.get("sort") || "";
  const pageParam = searchParams.get("page") || "1";

  const [filterValue, setFilterValue] = useState({
    availability: availabilityParam,
    category: categoryParam,
    subcategory: subcategoryParam,
    sort: sortParam,
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getCategories(jwt));
      dispatch(getAllSubCategories(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    const data = {
      category: filterValue.category || "",
      subCategory: filterValue.subcategory || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: filterValue.sort || "price_low",
      pageNumber: Number(pageParam) - 1,
      pageSize: 10,
      stock: filterValue.availability === "All" ? "" : filterValue.availability,
    };
    dispatch(findProducts(data));
  }, [filterValue, pageParam, dispatch]);

  useEffect(() => {
    setFilterValue({
      availability: availabilityParam,
      category: categoryParam,
      subcategory: subcategoryParam,
      sort: sortParam,
    });
  }, [availabilityParam, categoryParam, subcategoryParam, sortParam]);

  // ✅ Correctly handle category as array in subcategory
  const filteredSubcategories = filterValue.category
    ? subcategories.filter((sub) =>
        Array.isArray(sub.category)
          ? sub.category.some((cat) => cat._id === filterValue.category)
          : sub.category?._id === filterValue.category
      )
    : [];

  const handleFilterChange = (e, key) => {
    const value = e.target.value;

    if (key === "category") {
      setFilterValue((prev) => ({ ...prev, category: value, subcategory: "" }));
      searchParams.set("category", value);
      searchParams.delete("subcategory");
    } else {
      setFilterValue((prev) => ({ ...prev, [key]: value }));
      searchParams.set(key, value);
    }

    searchParams.set("page", "1");
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", String(value));
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader title="Sort & Filters" />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterValue.category}
                onChange={(e) => handleFilterChange(e, "category")}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth disabled={!filterValue.category || filteredSubcategories.length === 0}>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={filterValue.subcategory}
                onChange={(e) => handleFilterChange(e, "subcategory")}
                label="Subcategory"
              >
                <MenuItem value="">All Subcategories</MenuItem>
                {filteredSubcategories.length === 0 ? (
                  <MenuItem disabled>No subcategories available</MenuItem>
                ) : (
                  filteredSubcategories.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={filterValue.availability || "All"}
                onChange={(e) => handleFilterChange(e, "availability")}
                label="Availability"
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"in_stock"}>In Stock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By Price</InputLabel>
              <Select
                value={filterValue.sort || "price_low"}
                onChange={(e) => handleFilterChange(e, "sort")}
                label="Sort By Price"
              >
                <MenuItem value={"price_low"}>Low - High</MenuItem>
                <MenuItem value={"price_high"}>High - Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Card className="mt-2">
        <CardHeader title="All Products" />
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Subcategory</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct.products?.data?.content?.length ? (
                customersProduct.products.data.content.map((item) => (
                  <TableRow hover key={item._id}>
                    {/* {console.log(item)} */}
                    <TableCell>
                      <Avatar alt={item.title} src={item.imageUrl} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                        <Typography fontWeight={500}>{item.title}</Typography>
                        <Typography variant="caption">{item.brand}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.category?.name || "-"}</TableCell>
                    <TableCell align="center">{item.subCategory?.name || "-"}</TableCell>
                    <TableCell align="center">{item.discountedPrice}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">
                      <Button variant="text" color="error" onClick={() => handleDeleteProduct(item._id)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="text" color="error" onClick={() => handleDeleteProduct(item._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card className="mt-2">
        <Box display="flex" justifyContent="center" py={3}>
          <Pagination
            count={customersProduct.products?.totalPages || 0}
            color="primary"
            onChange={handlePaginationChange}
            page={Number(pageParam) || 1}
            showFirstButton
            showLastButton
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ProductsTable;
