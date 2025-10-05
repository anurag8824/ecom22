// Order.js - Main Order Component
import { Box, Grid, Drawer, IconButton, Chip, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delivered" }, // Fixed typo
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" }, // Fixed typo
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector(store => store);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [jwt, dispatch]);

  useEffect(() => {
    if (order.orders) {
      if (selectedFilters.length === 0) {
        setFilteredOrders(order.orders);
      } else {
        const filtered = order.orders.filter(orderItem => 
          selectedFilters.includes(orderItem.orderStatus.toLowerCase().replace(/\s/g, ''))
        );
        setFilteredOrders(filtered);
      }
    }
  }, [order.orders, selectedFilters]);

  const handleFilterChange = (filterValue) => {
    setSelectedFilters(prev => 
      prev.includes(filterValue) 
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const FilterContent = () => (
    <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg">Filters</h1>
        {isMobile && (
          <IconButton onClick={() => setMobileFiltersOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedFilters.map(filter => (
              <Chip
                key={filter}
                label={orderStatus.find(status => status.value === filter)?.label}
                onDelete={() => handleFilterChange(filter)}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="space-y-4 mt-6">
        <h2 className="font-semibold text-gray-700">ORDER STATUS</h2>
        {orderStatus.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`filter-${option.value}`}
              value={option.value}
              type="checkbox"
              checked={selectedFilters.includes(option.value)}
              onChange={() => handleFilterChange(option.value)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`filter-${option.value}`}
              className="ml-3 text-sm text-gray-600 cursor-pointer select-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Box className={`${isMobile ? 'px-4 py-4' : 'px-10 py-6'}`}>
      {/* Mobile Filter Button */}
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FilterListIcon className="text-gray-600" />
            <span className="text-sm font-medium">Filters</span>
            {selectedFilters.length > 0 && (
              <Chip size="small" label={selectedFilters.length} color="primary" />
            )}
          </button>
        </div>
      )}

      <Grid container spacing={isMobile ? 0 : 3} sx={{ justifyContent: "space-between" }}>
        {/* Desktop Filters */}
        {!isMobile && (
          <Grid item xs={12} md={3} lg={2.5}>
            <FilterContent />
          </Grid>
        )}

        {/* Orders List */}
        <Grid item xs={12} md={9} lg={9.5}>
          {!isMobile && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">My Orders</h1>
              <p className="text-gray-600">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
              </p>
            </div>
          )}

          <Box className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((orderItem) => (
                <OrderCard order={orderItem} key={orderItem._id} isMobile={isMobile} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No orders found</h3>
                <p className="text-gray-500">
                  {selectedFilters.length > 0 
                    ? "Try adjusting your filters or clear them to see all orders."
                    : "You haven't placed any orders yet."
                  }
                </p>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        PaperProps={{
          sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '80vh' }
        }}
      >
        <div className="p-4">
          <FilterContent />
        </div>
      </Drawer>

      <BackdropComponent open={order.loading} />
    </Box>
  );
};

export default Order;