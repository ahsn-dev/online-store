import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import FinalizePurchase from "./pages/FinalizePurchase";
import PanelLayout from "./pages/PanelLayout";
import LoginPanel from "./pages/LoginPanel";
import ProductsPanel from "./pages/ProductsPanel";

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
        path: "/homePage",
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
  {
    path: "/loginPanel",
    element: <LoginPanel />,
  },
  {
    path: "/panel",
    element: <PanelLayout />,
    children: [
      {
        path: "panel/productsPanel",
        element: <ProductsPanel />,
      },
    ],
  },
]);

export default router;
