// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

/* ************************************************************************* */

// Import the main app component

import App from "./App";
import About from "./pages/About";
import Account from "./pages/Account/Account";
import AccountEdit from "./pages/Account/AccountModify";
import Login from "./pages/Account/Login";
import SignupForm from "./pages/Account/SignupForm";
// import FavoritesList from "./pages/Games/FavoriteGames";
import GameDetail from "./pages/Games/GameDetail";
import GamesList from "./pages/Games/GameList";
import PacmanGame from "./pages/Games/PacmanGame";
import Home from "./pages/Home";

import LotDetail from "./pages/Lots/LotsDetail";
import LotsList from "./pages/Lots/LotsList";

// Import additional components for new routes
// Try creating these components in the "pages" folder
// import About from "./pages/About";
// import Contact from "./pages/Contact";

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
      { path: "/Lots", element: <LotsList /> },
      { path: "/Login", element: <Login /> },
      { path: "/Signup", element: <SignupForm /> },
      {
        path: "/lot/:id",
        element: <LotDetail />,
      },
      { path: "/account", element: <Account /> },
      { path: "/accountedit", element: <AccountEdit /> },
      // { path: "/favorites", element: <FavoritesList /> },
    ],
  },
]);
// Import additional components for new routes

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
  </StrictMode>,
);
