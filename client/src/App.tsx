// import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Nav from "../src/components/default/Nav";

import ContentWithFooter from "./ContentWithFooter";
import axios from "axios";

axios.defaults.baseURL = "https://861d-2406-5900-1009-4081-7d39-ee1-c7ed-8353.ngrok-free.app";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Nav /> */}
        <ContentWithFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
