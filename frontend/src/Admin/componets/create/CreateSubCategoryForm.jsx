import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Redux/Customers/Category/Action";
import { createSubCategory } from "../../../Redux/Customers/SubCategory/Action";

const CreateSubCategoryForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { categories } = useSelector((store) => store.category);
  const categoryList = categories?.data || [];

  useEffect(() => {
    if (jwt) {
      dispatch(getCategories(jwt));
    }
  }, [dispatch, jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategories.length && name.trim()) {
      dispatch(
        createSubCategory(
          {
            name,
            image,
            category: selectedCategories, // Array of ObjectId
          },
          jwt
        )
      );
      setName("");
      setImage("");
      setSelectedCategories([]);
    }
  };

  return (
    <div className="py-10">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Add SubCategory
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <TextField
              label="SubCategory Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Image URL"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Categories</InputLabel>
              <Select
                multiple
                value={selectedCategories}
                onChange={(e) => setSelectedCategories(e.target.value)}
                input={<OutlinedInput label="Categories" />}
                renderValue={(selected) =>
                  selected
                    .map((id) => {
                      const cat = categoryList.find((c) => c._id === id);
                      return cat?.name || "";
                    })
                    .join(", ")
                }
              >
                {categoryList.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    <Checkbox checked={selectedCategories.includes(cat._id)} />
                    <ListItemText primary={cat.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button type="submit" variant="contained" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateSubCategoryForm;
