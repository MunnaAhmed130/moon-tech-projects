import { RouterProvider } from "react-router-dom";
import "./App.css";
import ProductProvider from "./context/ProductProvider";
import routes from "./routes/routes";
// import "./products.json";
// This project is about context & useReducer

function App() {
  return (
    <ProductProvider>
      <RouterProvider router={routes} />
    </ProductProvider>
  );
}

export default App;
