const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");


// Create a new cart for a user
async function createCart(user) {
  const cart = new Cart({ user });
  const createdCart = await cart.save();
  return createdCart;
}

// Find a user's cart and update cart details
async function findUserCart(userId) {
  let cart = await Cart.findOne({ user: userId })
  if (!cart) return null;
  
  let cartItems = await CartItem.find({cart:cart?._id}).populate("product")

  cart.cartItems = cartItems
  

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (const cartItem of cart.cartItems) {
    totalPrice += cartItem.price;
    totalDiscountedPrice += cartItem.discountedPrice;
    totalItem += cartItem.quantity;
  }

  // ✅ Group items by subCategory
  const subCategoryGroups = {};
  for (const item of cart.cartItems) {
    const subCatId = item.product.subCategory?.toString();
    if (!subCategoryGroups[subCatId]) subCategoryGroups[subCatId] = [];
    subCategoryGroups[subCatId].push(item);
  }

    // ✅ Apply "Buy 1 Get 1 Free" style discount for same subcategory
    let sameCategoryDiscount = 0;

    for (const subCatId in subCategoryGroups) {
      const group = subCategoryGroups[subCatId];
  
      if (group.length > 1) {
        // find the minimum discountedPrice in this subcategory group
        const minDiscountedItem = group.reduce((min, item) =>
          item.discountedPrice < min.discountedPrice ? item : min
        );
        sameCategoryDiscount += minDiscountedItem.discountedPrice;
      }
    }


  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;
  cart.totalDiscountedPrice = totalDiscountedPrice - sameCategoryDiscount;
  cart.discounte = totalPrice - (totalDiscountedPrice - sameCategoryDiscount);
  cart.sameCategoryDiscount = sameCategoryDiscount;

  // const updatedCart = await cart.save();
  return cart;
}

// Add an item to the user's cart
async function addCartItem(userId, req) {
  // Check if user has a cart
  let cart = await Cart.findOne({ user: userId });

  // If not, create a new cart
  if (!cart) {
    cart = new Cart({ user: userId, cartItems: [] });
    await cart.save();
  }

  const product = await Product.findById(req?.productId);
  if (!product) {
    throw new Error("Product not found.");
  }

  // Check if the cart item already exists
  const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

  if (!isPresent) {
    const quantity = req.quantity || 1;

    const cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      quantity,
      userId,
      price: product.price,
      size: req?.size,
      discountedPrice: product.discountedPrice
    });

    const createdCartItem = await cartItem.save();

    cart.cartItems.push(createdCartItem._id); // Make sure `cartItems` is an array of ObjectIds
    cart.discounte = product.price - product.discountedPrice;
    await cart.save();
  }

  return 'Item added to cart';
}


module.exports = { createCart, findUserCart, addCartItem };
