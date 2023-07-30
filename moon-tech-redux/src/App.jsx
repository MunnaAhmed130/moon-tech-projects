import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import routes from "./routes/routes";
import "./App.css";

// in this project we only you redux to add or remove products to cart cart
// redux and react-redux is used

function App() {
  return (
    // <div className="App">
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
    // </div>
  );
}

export default App;
