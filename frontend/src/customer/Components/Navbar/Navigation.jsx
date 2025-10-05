import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, TextField, InputAdornment, IconButton } from "@mui/material";
import { navigation } from "../../../config/navigationMenu";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import { getUser, logout } from "../../../Redux/Auth/Action";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import { searchProducts } from "../../../Redux/Customers/Product/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart, customerProduct } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
      const timeoutId = setTimeout(() => {
        const suggestions = [];
        navigation.categories?.forEach(category => {
          category.sections?.forEach(section => {
            section.items?.forEach(item => {
              if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                suggestions.push({
                  type: 'category',
                  name: item.name,
                  category: category.name,
                  section: section.name,
                  path: `/${category.id}/${section.id}/${item.id}`
                });
              }
            });
          });
        });

        const productSuggestions = [
          `${searchQuery} for men`,
          `${searchQuery} for women`,
          `${searchQuery} collection`,
          `Best ${searchQuery}`,
          `Premium ${searchQuery}`
        ].slice(0, 3);

        productSuggestions.forEach(suggestion => {
          suggestions.push({
            type: 'product',
            name: suggestion,
            path: `/search?q=${encodeURIComponent(suggestion)}`
          });
        });

        setSearchSuggestions(suggestions.slice(0, 8));
        setShowSuggestions(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
    navigate("/login");
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  const handleMobileCategoryClick = (category, section, item) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpen(false);
  };

  const handleSearch = (e, query = null) => {
    if (e) e.preventDefault();
    const searchTerm = query || searchQuery;

    if (searchTerm.trim()) {
      // Dispatch search action from navbar
      const searchData = {
        search: searchTerm.trim(),
        pageNumber: 0,
        pageSize: 10,
        sort: "newest"
      };
      dispatch(searchProducts(searchData));

      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);

      setSearchOpen(false);
      setSearchQuery("");
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery("");
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      navigate(suggestion.path);
    } else {
      handleSearch(null, suggestion.name);
    }
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleSearchBlur = (e) => {
    setTimeout(() => {
      if (!searchQuery) setSearchOpen(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() && searchSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (
      auth.user?.role !== "ADMIN" &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(-1);
    }
  }, [auth.user]);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
  };

  const handleMyOrderClick = () => {
    handleCloseUserMenu();
    navigate("/account/order");
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  return (
    <div className="bg-white">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="px-4 pb-4 relative">
                  <form onSubmit={handleSearch} className="relative">
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </form>

                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center space-x-2">
                            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{suggestion.name}</span>
                            {suggestion.type === 'category' && (
                              <span className="text-xs text-gray-500">in {suggestion.category}</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {auth.user ? (
                  <div className="border-b border-gray-200 px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          width: 40,
                          height: 40,
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {auth.user?.firstName} {auth.user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{auth.user?.email}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={handleProfileClick}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleMyOrderClick}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={handleWishlistClick}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Wishlist
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-gray-200 px-4 py-4">
                    <Button
                      onClick={handleOpen}
                      variant="outlined"
                      fullWidth
                      startIcon={<UserIcon className="h-4 w-4" />}
                      className="justify-start"
                    >
                      Sign In
                    </Button>
                  </div>
                )}

                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4 overflow-x-auto">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-shrink-0 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        {category.sections?.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items?.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <button
                                    onClick={() =>
                                      handleMobileCategoryClick(category, section, item)
                                    }
                                    className="-m-2 block p-2 text-gray-500 hover:text-gray-700 text-left w-full"
                                  >
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages?.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <p className="font-bold text-xl">Shopssy</p>
                </Link>
              </div>

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories?.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus:outline-none"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections?.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items?.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <button
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800 text-left"
                                                >
                                                  {item.name}
                                                </button>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center space-x-2">
                <div className="hidden md:block relative">
                  {searchOpen ? (
                    <div className="relative">
                      <form onSubmit={handleSearch} className="flex items-center">
                        <TextField
                          size="small"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          onFocus={handleSearchFocus}
                          onBlur={handleSearchBlur}
                          autoFocus
                          sx={{ width: 300 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton size="small" onClick={handleSearchToggle}>
                                  <XMarkIcon className="h-4 w-4" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </form>

                      {showSuggestions && searchSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                          {searchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex items-center space-x-2">
                                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{suggestion.name}</span>
                                {suggestion.type === 'category' && (
                                  <span className="text-xs text-gray-500">in {suggestion.category}</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <IconButton
                      onClick={handleSearchToggle}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <MagnifyingGlassIcon className="h-6 w-6" />
                    </IconButton>
                  )}
                </div>

                <div className="md:hidden">
                  <IconButton
                    onClick={handleSearchToggle}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </IconButton>
                </div>

                <div className="hidden md:flex md:items-center">
                  {auth.user ? (
                    <div>
                      <Avatar
                        className="text-white cursor-pointer"
                        onClick={handleUserClick}
                        aria-controls={openUserMenu ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openUserMenu ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                          width: 36,
                          height: 36,
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                        <MenuItem onClick={handleMyOrderClick}>My Orders</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      size="small"
                    >
                      Sign In
                    </Button>
                  )}
                </div>

                <div className="flow-root">
                  <Button
                    onClick={handleWishlistClick}
                    className="group -m-2 flex items-center p-2"
                    size="small"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="sr-only">wishlist</span>
                  </Button>
                </div>

                <div className="flow-root">
                  <Button
                    onClick={() => navigate("/cart")}
                    className="group -m-2 flex items-center p-2"
                    size="small"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.cart?.totalItem || 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {searchOpen && (
            <div className="md:hidden border-b border-gray-200 px-4 py-3 bg-gray-50 relative">
              <form onSubmit={handleSearch}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={handleSearchToggle}>
                          <XMarkIcon className="h-4 w-4" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>

              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{suggestion.name}</span>
                        {suggestion.type === 'category' && (
                          <span className="text-xs text-gray-500">in {suggestion.category}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}