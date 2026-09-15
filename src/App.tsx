import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Providers from "./Providers";

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
