import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Chip,
    Fade,
    Paper,
    Skeleton
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../../Redux/Customers/Wishlist/Action";
import WishlistCard from "./WishlistCard";
import BackdropComponent from "../BackDrop/Backdrop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const Wishlist = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [priceFilter, setPriceFilter] = useState("");

    const { wishlist, loading } = useSelector((state) => state.wishlist);
    const items = wishlist?.data?.wishlist?.items || [];

    useEffect(() => {
        if (jwt) {
            dispatch(getWishlist(jwt, priceFilter || null));
        }
    }, [dispatch, jwt, priceFilter]);

    const handleFilterChange = (event) => {
        setPriceFilter(event.target.value);
    };

    // Loading skeleton component
    const WishlistSkeleton = () => (
        <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
                        <Skeleton variant="rectangular" height={280} />
                        <Box sx={{ p: 2 }}>
                            <Skeleton variant="text" height={32} width="80%" />
                            <Skeleton variant="text" height={24} width="60%" />
                            <Skeleton variant="text" height={28} width="40%" />
                            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                <Skeleton variant="rectangular" height={36} width="48%" sx={{ borderRadius: 2 }} />
                                <Skeleton variant="rectangular" height={36} width="48%" sx={{ borderRadius: 2 }} />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );

    // Empty state component
    const EmptyWishlist = () => (
        <Fade in={true}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                    textAlign: "center",
                    py: 8,
                }}
            >
                <Box
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        bgcolor: "grey.100",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                    }}
                >
                    <ShoppingBagIcon sx={{ fontSize: 60, color: "grey.400" }} />
                </Box>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                >
                    Your Wishlist is Empty
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 400, mb: 3 }}
                >
                    Save items you love to your wishlist. Review them anytime and easily move them to your cart.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "primary.main",
                        cursor: "pointer",
                        "&:hover": {
                            color: "primary.dark",
                        },
                    }}
                    onClick={() => window.history.back()}
                >
                    <Typography variant="button" fontWeight="bold">
                        Continue Shopping
                    </Typography>
                </Box>
            </Box>
        </Fade>
    );

    return (
        <Box sx={{ 
            minHeight: "100vh", 
            bgcolor: "#f8f9fa",
            py: { xs: 2, md: 4 }
        }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 2
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}>
                                <FavoriteIcon sx={{ fontSize: 32, color: "primary.main" }} />
                                <Typography 
                                    variant="h3" 
                                    fontWeight="bold"
                                    color="text.primary"
                                    sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
                                >
                                    My Wishlist
                                </Typography>
                            </Box>
                            {items.length > 0 && (
                                <Chip
                                    label={`${items.length} item${items.length > 1 ? 's' : ''}`}
                                    color="primary"
                                    variant="outlined"
                                    sx={{ 
                                        fontWeight: "bold",
                                        fontSize: "0.9rem",
                                        height: 32
                                    }}
                                />
                            )}
                        </Box>

                        {/* Filter Section */}
                        {items.length > 0 && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <FilterListIcon sx={{ color: "text.secondary" }} />
                                <FormControl 
                                    variant="outlined" 
                                    size="small" 
                                    sx={{ 
                                        minWidth: 200,
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            bgcolor: "white",
                                        }
                                    }}
                                >
                                    <InputLabel>Sort by Price</InputLabel>
                                    <Select
                                        value={priceFilter}
                                        onChange={handleFilterChange}
                                        label="Sort by Price"
                                    >
                                        <MenuItem value="">
                                            <em>Default</em>
                                        </MenuItem>
                                        <MenuItem value="price-low-to-high">
                                            Price: Low to High
                                        </MenuItem>
                                        <MenuItem value="price-high-to-low">
                                            Price: High to Low
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        )}
                    </Box>

                    {/* Subtitle */}
                    {items.length > 0 && (
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ maxWidth: 600 }}
                        >
                            Review your saved items and add them to your cart when you're ready to purchase.
                        </Typography>
                    )}
                </Box>

                {/* Content Section */}
                {loading ? (
                    <WishlistSkeleton />
                ) : items.length > 0 ? (
                    <Fade in={true}>
                        <Grid container spacing={3}>
                            {items.map((item, index) => (
                                <Grid 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    md={4} 
                                    lg={3} 
                                    key={item._id}
                                >
                                    <Fade 
                                        in={true} 
                                        timeout={300}
                                        style={{ 
                                            transitionDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <Box sx={{ height: "100%" }}>
                                            <WishlistCard product={item.product} />
                                        </Box>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    </Fade>
                ) : (
                    <EmptyWishlist />
                )}

                {/* Footer Info for Non-Empty Wishlist */}
                {items.length > 0 && (
                    <Box sx={{ 
                        mt: 6, 
                        pt: 4, 
                        borderTop: "1px solid", 
                        borderColor: "grey.200",
                        textAlign: "center"
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            Items in your wishlist are saved for 30 days. Add them to cart to secure your favorites!
                        </Typography>
                    </Box>
                )}
            </Container>

            <BackdropComponent open={loading} />
        </Box>
    );
};

export default Wishlist;