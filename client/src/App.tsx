// import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Nav from "../src/components/default/Nav";

import ContentWithFooter from "./ContentWithFooter";
import axios from "axios";

axios.defaults.baseURL = "https://83c0-2406-5900-1009-4081-e488-faee-550f-b3a3.ngrok-free.app";
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
