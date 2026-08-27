import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./config/store";
import ThemeRegistry from "./themes/ThemeRegistry";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeRegistry>
          <AppRoutes />
        </ThemeRegistry>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
