import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../Redux/Customers/Category/Action";

const CreateCategoryForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name, image }, jwt));
    setName("");
    setImage("");
  };

  return (
    <div className="py-10">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Add Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Category Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Image URL"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
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

export default CreateCategoryForm;
