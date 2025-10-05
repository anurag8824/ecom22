import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Product from "../customer/Components/Product/Product/Product";
import Contact from "../Pages/Contact";
import TearmsCondition from "../Pages/TearmsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import About from "../Pages/About";
import Homepage from "../Pages/Homepage";
import Navigation from "../customer/Components/Navbar/Navigation";
import Cart from "../customer/Components/Cart/Cart";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import { customTheme, customerTheme } from "../Admin/them/customeThem";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import Footer from "../customer/Components/footer/Footer";
import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/Components/ReviewProduct/RateProduct";
import Navbar from "../customer/Components/Navbar/Navbar";
import Wishlist from "../customer/Components/Wishlist/Wishlist";

const CustomerRoutes = () => {
    const location = useLocation();
    
    // Only show Navigation component when not on the NotFound page
    const showNavigation = location.pathname !== "*";

    return (
        <ThemeProvider theme={customerTheme}>
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column' 
            }}>
                {showNavigation && <Navigation />}
                
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/home" element={<Homepage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-condition" element={<TearmsCondition />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/product/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/account/order" element={<Order />} />
                        <Route path="/account/order/:orderId" element={<OrderDetails />} />
                        <Route path="/account/rate/:productId" element={<RateProduct />} />
                        <Route path="/payment/:orderId" element={<PaymentSuccess />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                </main>
                
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default CustomerRoutes;