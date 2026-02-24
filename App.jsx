import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NewsAndEvents from "./pages/NewsAndEvents";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Dashboard/Login";
import ProtectedRoute from "./pages/Dashboard/ProtectedRoute";

const router = createBrowserRouter([
  // Main Pages - Each has its own layout
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/news-and-events",
    element: <NewsAndEvents />,
  },

  // Dashboard Login
  {
    path: "/dashboard-login",
    element: <Login />,
  },

  // Dashboard - Protected route (requires authentication)
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
