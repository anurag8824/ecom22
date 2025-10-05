import React, { useState } from "react";
import { 
    Box, 
    Button, 
    Typography, 
    IconButton, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    Chip,
    Fade,
    Zoom,
    Stack,
    Divider,
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../Redux/Customers/Wishlist/Action";
import { addItemToCart } from "../../../Redux/Customers/Cart/Action";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const WishlistCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    
    // State management
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleRemove = () => {
        dispatch(removeFromWishlist(product._id, jwt));
        setAlertMessage("Removed from wishlist");
        setAlertSeverity("info");
        setShowAlert(true);
    };

    // Updated category detection to include "cloths" from your JSON
    const isClothingItem = product.category?.name?.toLowerCase() === "clothing" || 
                          product.category?.name?.toLowerCase() === "clothes" ||
                          product.category?.name?.toLowerCase() === "cloths" ||
                          product.category?.name?.toLowerCase() === "apparel";

    const discountPercentage = Math.round(((product.price - product.discountedPrice) / product.price) * 100);

    const handleAddToCart = () => {
        if (isClothingItem && (!product.sizes || product.sizes.length === 0)) {
            setAlertMessage("No sizes available for this item");
            setAlertSeverity("error");
            setShowAlert(true);
            return;
        }
        
        if (isClothingItem && product.sizes) {
            const availableSizes = product.sizes.filter(size => size.quantity > 0);
            if (availableSizes.length === 0) {
                setAlertMessage("All sizes are out of stock");
                setAlertSeverity("error");
                setShowAlert(true);
                return;
            }
        }
        
        if (isClothingItem) {
            setOpenDialog(true);
        } else {
            const data = { 
                productId: product._id, 
                quantity: 1 
            };
            dispatch(addItemToCart({ data, jwt }));
            setAlertMessage("Added to cart successfully!");
            setAlertSeverity("success");
            setShowAlert(true);
        }
    };

    const handleConfirmAddToCart = () => {
        if (isClothingItem && !selectedSize) {
            setAlertMessage("Please select a size");
            setAlertSeverity("error");
            setShowAlert(true);
            return;
        }

        if (isClothingItem && selectedSize) {
            const selectedSizeObj = product.sizes.find(size => size.name === selectedSize);
            if (selectedSizeObj && selectedSizeObj.quantity <= 0) {
                setAlertMessage("Selected size is out of stock");
                setAlertSeverity("error");
                setShowAlert(true);
                return;
            }
            
            if (selectedSizeObj && quantity > selectedSizeObj.quantity) {
                setAlertMessage(`Only ${selectedSizeObj.quantity} items available in this size`);
                setAlertSeverity("error");
                setShowAlert(true);
                return;
            }
        }

        const data = { 
            productId: product._id, 
            quantity: quantity 
        };
        
        if (isClothingItem && selectedSize) {
            data.size = selectedSize;
        }

        dispatch(addItemToCart({ data, jwt }));
        setAlertMessage("Added to cart successfully!");
        setAlertSeverity("success");
        setShowAlert(true);
        setOpenDialog(false);
        
        setSelectedSize("");
        setQuantity(1);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedSize("");
        setQuantity(1);
    };

    const availableSizes = product.sizes?.filter(size => size.quantity > 0) || [];
    const hasAvailableSizes = availableSizes.length > 0;

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    height: 420, // Fixed height for consistency
                    display: "flex",
                    flexDirection: "column",
                    background: "#ffffff",
                    border: "1px solid",
                    borderColor: isHovered ? "primary.main" : "rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isHovered 
                        ? "0 12px 24px rgba(0,0,0,0.1)" 
                        : "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            zIndex: 3,
                            background: "#ef4444",
                            color: "white",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                        }}
                    >
                        <LocalOfferIcon sx={{ fontSize: 12 }} />
                        {discountPercentage}% OFF
                    </Box>
                )}

                {/* Wishlist Button */}
                <IconButton
                    onClick={handleRemove}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 3,
                        width: 36,
                        height: 36,
                        background: "rgba(255, 255, 255, 0.9)",
                        color: "#ef4444",
                        "&:hover": {
                            background: "#ef4444",
                            color: "white",
                            transform: "scale(1.1)",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 18 }} />
                </IconButton>

                {/* Image Container - Reduced height */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: 240, // Reduced from 320px
                        overflow: "hidden",
                        background: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                >
                    <Box
                        component="img"
                        src={product.imageUrl}
                        alt={product.title}
                        onLoad={() => setImageLoaded(true)}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                            transform: isHovered ? "scale(1.05)" : "scale(1)",
                        }}
                    />
                </Box>

                {/* Content Section - Optimized spacing */}
                <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    {/* Brand & Title - Compact */}
                    <Box sx={{ mb: 1 }}>
                        {product.brand && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "primary.main",
                                    fontWeight: 600,
                                    fontSize: "0.7rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    display: "block",
                                }}
                            >
                                {product.brand}
                            </Typography>
                        )}
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                lineHeight: 1.3,
                                color: "text.primary",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                minHeight: "2.5em",
                            }}
                        >
                            {product.title}
                        </Typography>
                    </Box>

                    {/* Compact Size Display for Clothing */}
                    {isClothingItem && (
                        <Box sx={{ mb: 1.5 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 500,
                                    mb: 0.5,
                                    display: "block",
                                    fontSize: "0.7rem"
                                }}
                            >
                                Available Sizes
                            </Typography>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                                {availableSizes.slice(0, 4).map((size) => ( // Limit to 4 sizes for space
                                    <Chip
                                        key={size.name}
                                        label={size.name}
                                        size="small"
                                        sx={{
                                            height: 24,
                                            fontSize: "0.7rem",
                                            fontWeight: 600,
                                            borderRadius: 1.5,
                                            background: size.quantity <= 5 ? "#fbbf24" : "#10b981",
                                            color: "white",
                                            border: "none",
                                        }}
                                    />
                                ))}
                                {availableSizes.length > 4 && (
                                    <Chip
                                        label={`+${availableSizes.length - 4}`}
                                        size="small"
                                        sx={{
                                            height: 24,
                                            fontSize: "0.7rem",
                                            fontWeight: 600,
                                            borderRadius: 1.5,
                                            background: "#6b7280",
                                            color: "white",
                                        }}
                                    />
                                )}
                                {!hasAvailableSizes && (
                                    <Chip
                                        label="Out of Stock"
                                        size="small"
                                        sx={{
                                            height: 24,
                                            background: "#ef4444",
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: "0.7rem",
                                        }}
                                    />
                                )}
                            </Stack>
                        </Box>
                    )}

                    {/* Compact Pricing */}
                    <Box sx={{ mt: "auto", mb: 1.5 }}>
                        <Stack direction="row" alignItems="baseline" spacing={1}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: "primary.main",
                                    fontSize: "1.2rem",
                                }}
                            >
                                ₹{product.discountedPrice?.toLocaleString()}
                            </Typography>
                            {product.price !== product.discountedPrice && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    ₹{product.price?.toLocaleString()}
                                </Typography>
                            )}
                        </Stack>
                        {discountPercentage > 0 && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#059669",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <CheckCircleIcon sx={{ fontSize: 12 }} />
                                Save ₹{(product.price - product.discountedPrice)?.toLocaleString()}
                            </Typography>
                        )}
                    </Box>

                    {/* Compact Action Buttons */}
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
                            onClick={() => navigate(`/product/${product._id}`)}
                            sx={{
                                flex: 1,
                                py: 0.8,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                borderColor: "primary.main",
                                color: "primary.main",
                                "&:hover": {
                                    borderColor: "primary.dark",
                                    background: "rgba(59, 130, 246, 0.04)",
                                },
                            }}
                        >
                            View
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                            onClick={handleAddToCart}
                            disabled={isClothingItem && !hasAvailableSizes}
                            sx={{
                                flex: 1,
                                py: 0.8,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                background: isClothingItem && !hasAvailableSizes 
                                    ? "#9ca3af"
                                    : "primary.main",
                                "&:hover": {
                                    background: isClothingItem && !hasAvailableSizes 
                                        ? "#9ca3af"
                                        : "primary.dark",
                                },
                            }}
                        >
                            {isClothingItem && !hasAvailableSizes ? "Sold Out" : "Add to Cart"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {/* Dialog remains the same but with slight optimizations */}
            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                maxWidth="sm" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: "#ffffff",
                    }
                }}
            >
                <Box sx={{ 
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    p: 2.5,
                    color: "white"
                }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                        Add to Cart
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Customize your selection
                    </Typography>
                </Box>

                <DialogContent sx={{ p: 3 }}>
                    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: "1px solid", borderColor: "grey.200", mb: 2.5 }}>
                        <Stack direction="row" spacing={2.5} alignItems="center">
                            <Box sx={{ 
                                width: 80, 
                                height: 80,
                                borderRadius: 2,
                                overflow: "hidden",
                                flexShrink: 0,
                            }}>
                                <Box
                                    component="img"
                                    src={product.imageUrl}
                                    alt={product.title}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {product.brand}
                                </Typography>
                                <Stack direction="row" alignItems="baseline" spacing={1}>
                                    <Typography variant="h5" fontWeight="bold" color="primary">
                                        ₹{product.discountedPrice?.toLocaleString()}
                                    </Typography>
                                    {product.price !== product.discountedPrice && (
                                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                                            ₹{product.price?.toLocaleString()}
                                        </Typography>
                                    )}
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>

                    <Stack spacing={2.5}>
                        <Stack direction="row" spacing={2}>
                            {isClothingItem && (
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel>Select Size *</InputLabel>
                                    <Select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        label="Select Size *"
                                        sx={{ borderRadius: 2 }}
                                    >
                                        {availableSizes.map((size) => (
                                            <MenuItem key={size.name} value={size.name}>
                                                <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                                                    <Typography fontWeight={600}>{size.name}</Typography>
                                                    {size.quantity <= 5 && (
                                                        <Chip 
                                                            label={`${size.quantity} left`} 
                                                            size="small" 
                                                            color="warning"
                                                        />
                                                    )}
                                                </Stack>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}

                            <TextField
                                label="Quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                                    if (isClothingItem && selectedSize) {
                                        const selectedSizeObj = availableSizes.find(size => size.name === selectedSize);
                                        if (selectedSizeObj) {
                                            setQuantity(Math.min(newQuantity, selectedSizeObj.quantity));
                                        } else {
                                            setQuantity(newQuantity);
                                        }
                                    } else {
                                        setQuantity(Math.min(newQuantity, 10));
                                    }
                                }}
                                inputProps={{ 
                                    min: 1, 
                                    max: isClothingItem && selectedSize 
                                        ? availableSizes.find(size => size.name === selectedSize)?.quantity || 10
                                        : 10 
                                }}
                                sx={{ 
                                    minWidth: 120,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    }
                                }}
                            />
                        </Stack>

                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                background: "#f8fafc",
                                border: "1px solid",
                                borderColor: "primary.main",
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                                    Total Amount
                                </Typography>
                                <Typography variant="h4" fontWeight="bold" color="primary.main">
                                    ₹{(product.discountedPrice * quantity)?.toLocaleString()}
                                </Typography>
                            </Stack>
                        </Paper>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                        <Button 
                            onClick={handleCloseDialog}
                            variant="outlined"
                            size="large"
                            sx={{ 
                                flex: 1,
                                borderRadius: 2, 
                                py: 1.2,
                                fontWeight: 600,
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleConfirmAddToCart} 
                            variant="contained"
                            size="large"
                            disabled={isClothingItem && !selectedSize}
                            sx={{ 
                                flex: 2,
                                borderRadius: 2, 
                                py: 1.2,
                                fontWeight: 600,
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={() => setShowAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setShowAlert(false)} 
                    severity={alertSeverity}
                    variant="filled"
                    sx={{ borderRadius: 2 }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default WishlistCard;