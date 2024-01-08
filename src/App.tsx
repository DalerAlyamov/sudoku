import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/tools/routes";
import store from "./tools/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
