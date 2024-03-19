import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import Popular from "./pages/Popular";
import ComingSoon from "./pages/ComingSoon";
import NowPlaying from "./pages/NowPlaying";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Popular />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);

export default router;
