import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Admission from "./pages/Admission";
import NewsAndEvents from "./pages/NewsAndEvents";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

import Login from "./pages/Dashboard/Login";

const router = createBrowserRouter([
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
  {
    path: "/dashboard-login",
    element: <Login />,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>,
);
