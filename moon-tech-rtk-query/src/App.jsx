import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
      <Toaster />
    </div>
  );
}

export default App;
