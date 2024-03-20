import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/movieDetail";
import Movies from "./pages/Movies";

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
