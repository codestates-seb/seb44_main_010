// import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "../src/components/default/Nav";

import ContentWithFooter from "./ContentWithFooter";
import axios from "axios";


axios.defaults.baseURL = "https://b0f6-2406-5900-1009-4081-20b9-b2c7-1dad-3c7f.ngrok-free.app";
axios.defaults.withCredentials = true;



function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <ContentWithFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
