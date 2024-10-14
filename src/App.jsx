import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PageLayout from "./PageLayout";
import MainPage from "./Components/MainPage";
import FoodsPage from "./Components/FoodsPage";
import DrinksPage from "./Components/DrinksPage";
import DessertsPage from "./Components/DessertsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImagesPage from "./Components/imagesPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/foods", element: <FoodsPage /> },
        { path: "/drinks", element: <DrinksPage /> },
        { path: "/desserts", element: <DessertsPage /> },
        { path: "/images", element: <ImagesPage /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
