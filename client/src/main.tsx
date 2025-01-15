// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import About from "./pages/About";
import GameDetail from "./pages/GameDetail";
import GamesList from "./pages/GameList";
import Home from "./pages/Home";
import PacmanGame from "./pages/PacmanGame";
import SignupForm from "../src/pages/SignupForm.tsx";

/* ************************************************************************* */

// Create router configuration with routes
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/Game/:id",
        element: <GameDetail />,
      },
      {
        path: "/Games",
        element: <GamesList />,
      },
      {
        path: "/Pacman",
        element: <PacmanGame />,
      },
      { path: "/About", element: <About /> },

      { path: "/signup", element: <SignupForm /> },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
