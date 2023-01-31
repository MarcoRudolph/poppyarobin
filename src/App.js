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
import SternenDaemmerung from "./pages/SternenDaemmerung";
import HomePage from "./pages/HomePage";
import Bio from "./pages/Bio";
import ErrorPage from "./pages/ErrorPage";
import VonSternenGekuesst from "./pages/VonSternenGekuesst";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/vonsternengekuesst", element: <VonSternenGekuesst/> },
        { path: "/sternendaemmerung", element: <SternenDaemmerung/> },
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
