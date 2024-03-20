import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Movies pathType="" />,
        children: [
          {
            path: "movie/:movieId",
            element: <MovieDetail />,
          },
        ],
      },
      {
        path: "coming-soon",
        element: <Movies pathType="/coming-soon" />,
        children: [
          {
            path: "movie/:movieId",
            element: <MovieDetail />,
          },
        ],
      },
      {
        path: "now-playing",
        element: <Movies pathType="/now-playing" />,
        children: [
          {
            path: "movie/:movieId",
            element: <MovieDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;
