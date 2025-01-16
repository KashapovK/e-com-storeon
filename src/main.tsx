import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import store from "./store";
import { StoreContext } from "storeon/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </StrictMode>,
);
