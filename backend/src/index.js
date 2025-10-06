const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


// Default route
app.get("/", (req, res) => {
  let dbStatus = "❌ Not connected";
  
  // mongoose connection states:
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    dbStatus = "✅ MongoDB connected successfully";
  } else if (mongoose.connection.readyState === 2) {
    dbStatus = "⏳ MongoDB connecting...";
  }

  return res.status(200).send({
    message: "Welcome to ecommerce API - Node",
    mongoStatus: dbStatus,
  });
});

// Routes
const authRouter = require("./routes/auth.routes.js");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes.js");
app.use("/api/users", userRouter);

const addressRouter = require("./routes/address.routes.js");
app.use("/api/addresses", addressRouter);

const productRouter = require("./routes/product.routes.js");
app.use("/api/products", productRouter);

const adminProductRouter = require("./routes/product.admin.routes.js");
app.use("/api/admin/products", adminProductRouter);

const cartRouter = require("./routes/cart.routes.js");
app.use("/api/cart", cartRouter);

app.use("/api/wishlist", require("./routes/wishlist.routes"));

const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);

const cartItemRouter = require("./routes/cartItem.routes.js");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.routes.js");
app.use("/api/orders", orderRouter);

const paymentRouter = require("./routes/payment.routes.js");
app.use("/api/payments", paymentRouter);

const reviewRouter = require("./routes/review.routes.js");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating.routes.js");
app.use("/api/ratings", ratingRouter);

const adminOrderRoutes = require("./routes/adminOrder.routes.js");
app.use("/api/admin/orders", adminOrderRoutes);

// Connect DB and Start server
const PORT =  5454;

app.listen(PORT, "0.0.0.0", async () => {
  await connectDb();
  console.log(`✅ Ecommerce API running on port ${PORT}`);
});

module.exports = app;
