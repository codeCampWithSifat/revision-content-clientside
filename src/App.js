import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="max-w-[1340px] mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
