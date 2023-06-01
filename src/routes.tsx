import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import FinalizePurchase from "./pages/FinalizePurchase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/productPage",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/finalizePurchase",
        element: <FinalizePurchase />,
      },
    ],
  },
]);

export default router;
