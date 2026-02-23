import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "@/index.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Admission from "./pages/Admission";
import NewsAndEvents from "./pages/NewsAndEvents";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

import Dashboard from "./pages/Dashboard/Dashboard";

import Login from "./pages/Dashboard/Login";

// Layout component for main pages
const Layout = () => (
  <>
    <NavBar />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  // Main pages with Layout
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/admissions",
        element: <Admission />,
      },
      {
        path: "/news",
        element: <NewsAndEvents />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  // Dashboard routes without Layout (no NavBar/Footer)
  {
    path: "/dashboard-login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
