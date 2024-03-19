import { RouterProvider } from "react-router-dom";
import router from "./router";
import GolbalStyle from "./GlobalStyles";

function App() {
  return (
    <>
      <GolbalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
