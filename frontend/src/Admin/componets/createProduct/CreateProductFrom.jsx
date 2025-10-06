import { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./CreateProductForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../Redux/Customers/Product/Action";
import { getCategories } from "../../../Redux/Customers/Category/Action";
import { getAllSubCategories } from "../../../Redux/Customers/SubCategory/Action";


const initialSizes = [
];

const initialProductData = {
  imageUrl: "",
  brand: "",
  title: "",
  color: "",
  discountedPrice: "",
  price: "",
  discountPersent: "",
  sizes: initialSizes,
  quantity: "",
  category: "",
  subCategory: "",
  description: "",
};

const CreateProductForm = () => {
  const [productData, setProductData] = useState(initialProductData);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { category, subCategory } = useSelector((store) => store);

  const categories = category.categories?.data || [];
  const subcategories = subCategory.subcategories?.data || [];

  const filteredSubcategories = productData.category
    ? subcategories.filter((sub) =>
        sub.category.some((cat) => cat._id === productData.category)
      )
    : [];

  useEffect(() => {
    // if (jwt) {
      dispatch(getCategories(jwt));
      dispatch(getAllSubCategories(jwt));
    // }
  }, [dispatch, jwt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subCategory: "" }), 
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.sizes];
    sizes[index][name === "size_quantity" ? "quantity" : name] = value;
    setProductData((prev) => ({ ...prev, sizes }));
  };

  const handleAddSize = () => {
    setProductData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { name: "", quantity: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ data: productData, jwt }));
    setProductData(initialProductData);
  };

  return (
    <Fragment>
      <Typography variant="h3" textAlign="center" className="py-10">
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent"
              value={productData.discountPersent}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={!productData.category}>
              <InputLabel>SubCategory</InputLabel>
              <Select
                name="subCategory"
                value={productData.subCategory}
                onChange={handleChange}
                label="SubCategory"
              >
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </Grid>

          {/* Sizes Section */}
          {productData.sizes.map((size, index) => (
            <Grid container item spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(e) => handleSizeChange(e, index)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(e, index)}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button onClick={handleAddSize} variant="outlined">
              Add Size
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.8 }}
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default CreateProductForm;
