import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Grid, Select } from "@mui/material";
import { dressPage1 } from "../../../Data/dress/page1";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
  downloadInvoice
} from "../../../Redux/Admin/Orders/Action";
import { configure } from "@testing-library/react";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt, adminsOrder.delivered, adminsOrder.shipped, adminsOrder.confirmed]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  // Function to filter and sort orders
  const getFilteredAndSortedOrders = () => {
    let filteredOrders = [...(adminsOrder?.orders || [])];

    // Filter by status
    if (formData.status) {
      filteredOrders = filteredOrders.filter(order => order.orderStatus === formData.status);
    }

    // Sort orders
    if (formData.sort === "Newest") {
      filteredOrders.sort((a, b) => new Date(b.createdAt || b.orderDate) - new Date(a.createdAt || a.orderDate));
    } else if (formData.sort === "Older") {
      filteredOrders.sort((a, b) => new Date(a.createdAt || a.orderDate) - new Date(b.createdAt || b.orderDate));
    }

    return filteredOrders;
  };

  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED")
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId))
    setOrderStatus("ShIPPED")
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId))
    setOrderStatus("DELIVERED")
  };

  const handleDeleteOrder = (orderId) => {
    handleUpdateStatusMenuClose();
    dispatch(deleteOrder(orderId));
  };

  return (
    <Box>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"CANCELD"}>CANCLED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="sort"
                value={formData.sort}
                label="Sort By"
                onChange={handleChange}
              >
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Older"}>Older</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%', width: '100%' }}>
          <Table sx={{ minWidth: 1400 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 100, position: 'sticky', left: 0, backgroundColor: 'background.paper', zIndex: 1 }}>Image</TableCell>
                <TableCell sx={{ minWidth: 300 }}>Title</TableCell>
                <TableCell sx={{ minWidth: 80 }}>Price</TableCell>
                <TableCell sx={{ minWidth: 250 }}>Id</TableCell>
                <TableCell sx={{ textAlign: "center", minWidth: 100 }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center", minWidth: 100 }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center", minWidth: 80 }}>Delete</TableCell>
                <TableCell sx={{ textAlign: "center", minWidth: 120 }}>Invoice</TableCell>
                <TableCell sx={{ minWidth: 140 }}>FullName</TableCell>
                <TableCell sx={{ minWidth: 100 }}>City</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Mobile</TableCell>
                <TableCell sx={{ minWidth: 80 }}>State</TableCell>
                <TableCell sx={{ minWidth: 90 }}>Zipcode</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getFilteredAndSortedOrders().map((item, index) => (
                <TableRow key={item._id} hover>
                  <TableCell sx={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'background.paper',
                    zIndex: 1
                  }}>
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem, i) => (
                        <Avatar key={i} alt={orderItem.product?.title} src={orderItem.product?.imageUrl} />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        wordWrap: 'break-word'
                      }}>
                        {item?.orderItems.map((order, i) => (
                          <span key={i}>
                            {order.product?.title} ({order.quantity}){" "}
                          </span>
                        ))}
                      </Typography>
                      <Typography variant="caption" sx={{
                        wordWrap: 'break-word'
                      }}>
                        {item?.orderItems.map((order, i) => (
                          <span key={i} className="opacity-60">
                            {order.product?.brand}{" "}
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{item?.totalDiscountedPrice}</TableCell>

                  <TableCell sx={{
                    wordWrap: 'break-word',
                    wordBreak: 'break-all'
                  }}>
                    {item?._id}
                  </TableCell>

                  <TableCell>
                    <Chip
                      sx={{ color: "white !important", fontWeight: "bold" }}
                      label={item?.orderStatus}
                      size="small"
                      color={
                        item.orderStatus === "PENDING"
                          ? "info"
                          : item.orderStatus === "DELIVERED"
                            ? "success"
                            : "secondary"
                      }
                    />
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      id={`basic-button-${item._id}`}
                      aria-controls={`basic-menu-${item._id}`}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorElArray[index])}
                      onClick={(event) => handleUpdateStatusMenuClick(event, index)}
                    >
                      Status
                    </Button>
                    <Menu
                      id={`basic-menu-${item._id}`}
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={() => handleUpdateStatusMenuClose(index)}
                      MenuListProps={{ "aria-labelledby": `basic-button-${item._id}` }}
                    >
                      <MenuItem
                        onClick={() => handleConfirmedOrder(item._id, index)}
                        disabled={
                          item.orderStatus === "DELIVERED" ||
                          item.orderStatus === "SHIPPED" ||
                          item.orderStatus === "CONFIRMED"
                        }
                      >
                        CONFIRMED ORDER
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleShippedOrder(item._id, index)}
                        disabled={
                          item.orderStatus === "DELIVERED" ||
                          item.orderStatus === "SHIPPED"
                        }
                      >
                        SHIPPED ORDER
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(item._id)}>
                        DELIVERED ORDER
                      </MenuItem>
                    </Menu>
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={() => handleDeleteOrder(item._id)} variant="text">
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => dispatch(downloadInvoice(item.orderNumber))}
                    >
                      Download
                    </Button>
                  </TableCell>


                  <TableCell>
                    {item?.shippingAddress?.firstName} {item?.shippingAddress?.lastName}
                  </TableCell>
                  <TableCell>{item?.shippingAddress?.city}</TableCell>
                  <TableCell>{item?.shippingAddress?.mobile}</TableCell>
                  <TableCell>{item?.shippingAddress?.state}</TableCell>
                  <TableCell>{item?.shippingAddress?.zipCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default OrdersTable;