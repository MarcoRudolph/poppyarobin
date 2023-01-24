import "./App.css";
import Aktuelles from "./pages/Aktuelles";
import QandA from "./pages/QANDA";
import Impressum from "./pages/Impressum";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/Root";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./pages/Books";
import HomePage from "./pages/HomePage";
import Bio from "./pages/Bio";
import ErrorPage from "./pages/ErrorPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/buecher", element: <Books /> },
        { path: "/bio", element: <Bio /> },
        { path: "/aktuelles", element: <Aktuelles /> },
        { path: "/qnda", element: <QandA /> },
      ],
      errorElement:<ErrorPage/>
    },
  ]);



  return (
    <RouterProvider router={router}>
    
    </RouterProvider>
  );
}

export default App;
