// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./pages/Layout";
// import HomePage from "./pages/HomePage";
// import ErrorPage from "./pages/ErrorPage";
// import Cart from "./pages/Cart";
// import Products from "./pages/Products";
// import ProductPage from "./pages/ProductPage";
// import FinalizePurchase from "./pages/FinalizePurchase";
// import LayoutPanel from "./pages/LayoutPanel";
// import LoginPanel from "./pages/LoginPanel";
// import ProductsPanel from "./pages/ProductsPanel";
// import InventoryPanel from "./pages/InventoryPanel";
// import OrdersPanel from "./pages/OrdersPanel";
// import SuccessfulPayment from "./pages/SuccessfulPayment";
// import FailedPayment from "./pages/FailedPayment";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "homePage",
//         element: <HomePage />,
//       },
//       {
//         path: "productPage/:id",
//         element: <ProductPage />,
//       },
//       {
//         path: "cart",
//         element: <Cart />,
//       },
//       {
//         path: "products",
//         element: <Products />,
//       },
//       {
//         path: "finalizePurchase",
//         element: <FinalizePurchase />,
//       },
//       {
//         path: "successfulPayment",
//         element: <SuccessfulPayment />,
//       },
//       {
//         path: "failedPayment",
//         element: <FailedPayment />,
//       },
//     ],
//   },
//   {
//     path: "/loginPanel",
//     element: <LoginPanel />,
//   },
//   {
//     path: "/panel",
//     element: <LayoutPanel />,
//     children: [
//       {
//         path: "productsPanel",
//         element: <ProductsPanel />,
//       },
//       {
//         path: "InventoryPanel",
//         element: <InventoryPanel />,
//       },
//       {
//         path: "ordersPanel",
//         element: <OrdersPanel />,
//       },
//     ],
//   },
// ]);

// export default router;

import { createBrowserRouter, useMatch } from "react-router-dom";
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
import SuccessfulPayment from "./pages/SuccessfulPayment";
import FailedPayment from "./pages/FailedPayment";

// Custom route component to handle restricted routes
const RestrictedRoute = ({ element: Element, ...rest }: any) => {
  const match = useMatch(rest.path);
  const isRedirected = match && match.pathname;

  if (!isRedirected) {
    // Redirect to the error page or handle the restricted access as per your requirement
    return <ErrorPage />;
  }

  return <Element />;
};

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
        path: "productPage/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "finalizePurchase",
        element: <FinalizePurchase />,
      },
      {
        path: "successfulPayment",
        element: <RestrictedRoute element={<SuccessfulPayment />} />,
      },
      {
        path: "failedPayment",
        element: <FailedPayment />,
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
