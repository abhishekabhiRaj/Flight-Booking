import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
// import Layout from "../components/Layout";
import AdminLayout from "../components/Layout/AdminLayout";
import Home from "../pages/Home";
import Flights from "../pages/Flights";
import Blogs from "../pages/Blogs";
import Deals from "../pages/Deals";
import Contact from "../pages/Contact";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import BlogsManagement from "../pages/Admin/BlogsManagement";
import Claim from "../components/DealsShowcase/Claim";
import BookingForm from "../components/BookingForm";
import Earn from "../pages/Earn";
import BlogDetail from "../pages/Blog";
import NotFound from "../pages/NotFound";
import Booking from "../pages/Booking";
import { Loader, LoaderSmall } from "../components/Loader";

// Lazy load Layout
const Layout = React.lazy(() => import("../components/Layout"));

// Wrapper component for Suspense
const SuspendedLayout = () => (
  <Suspense fallback={<LoaderSmall />}>
    <Layout />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspendedLayout />, // Use Suspense-wrapped Layout
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "flights",
        element: <Flights />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "deals/claim",
        element: <Claim />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "earn",
        element: <Earn />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "blogs", element: <BlogsManagement /> },
    ],
  },
]);
