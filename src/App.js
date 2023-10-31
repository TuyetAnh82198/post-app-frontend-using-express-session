import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./components/RootLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import View from "./pages/View";
import Page500 from "./pages/Page500";
import Page404 from "./pages/Page404";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: "/post", element: <Post /> },
        { path: "/view/:id", element: <View /> },
        { path: "/server-error", element: <Page500 /> },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
