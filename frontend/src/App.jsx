import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import AdminSales from "./pages/admin/AdminSales";
import AddProduct from "./pages/admin/AddProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminOrders from "./pages/AdminOrders";
import ShowUserOrders from "./pages/ShowUserOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import UserInfo from "./pages/UserInfo";
import SingleProduct from "./pages/SingleProduct";
import AddressForm from "./pages/AddressForm";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/verify/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
        <Footer />
      </>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <Navbar />
        <SingleProduct />
        <Footer />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <ProtectedRoute>
          <Navbar />
          <Cart />
          <Footer />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/address",
    element: (
      <>
        <ProtectedRoute>
          <AddressForm />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Payment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-success",
    element: (
      <ProtectedRoute>
        <Navbar />
        <OrderSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <ProtectedRoute>
        <Navbar />
        <MyOrders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute adminOnly={true}>
        <>
          <Navbar /> <Dashboard />
        </>{" "}
      </ProtectedRoute>
    ),
    children: [
      {
        index:true,
        path: "sales",
        element: <AdminSales />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <AdminProduct />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "users/orders/:userId",
        element: <ShowUserOrders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/:id",
        element: <UserInfo />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
