import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import FinalizePurchase from "./pages/FinalizePurchase";
import LayoutPanel from "./pages/LayoutPanel";
import LoginPanel from "./pages/LoginPanel";
import ProductsPanel from "./pages/ProductsPanel";
import InventoryPanel from "./pages/InventoryPanel";
import OrdersPanel from "./pages/OrdersPanel";

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
        path: "homePage",
        element: <HomePage />,
      },
      {
        path: "productPage",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products:slug",
        element: <Products />,
      },
      {
        path: "finalizePurchase",
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
    element: <LayoutPanel />,
    children: [
      {
        path: "productsPanel",
        element: <ProductsPanel />,
      },
      {
        path: "InventoryPanel",
        element: <InventoryPanel />,
      },
      {
        path: "ordersPanel",
        element: <OrdersPanel />,
      },
    ],
  },
]);

export default router;
