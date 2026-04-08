import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Juegos from "./pages/Juegos.jsx";
import Gamepage from "./pages/GamePage.jsx";
import Precios from "./pages/Precios.jsx";
import Playlist from "./pages/Playlist.jsx";
import Top5 from "./pages/Top5.jsx";
import Mood from "./pages/Mood.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/juegos", element: <Juegos /> },
  {
    path: "/juegos/:id",
    element: <Gamepage />,
  },
  {
    path: "/precios/:nombreJuego",
    element: <Precios />,
  },
  {
    path: "/playlist",
    element: <Playlist />,
  },
  {
    path: "/top-5",
    element: <Top5 />,
  },
  {
    path: "/recomendacion",
    element: <Mood />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </QueryClientProvider>
  </StrictMode>,
);
