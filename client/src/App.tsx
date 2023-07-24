// import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Nav from "../src/components/default/Nav";

import ContentWithFooter from "./ContentWithFooter";
import axios from "axios";

import { getLocalstorage } from "./util/localStorage";
const acessToken = getLocalstorage("acessToken");

axios.defaults.headers.common["Authorization"] = acessToken;

axios.defaults.baseURL = "https://ef8b-61-43-126-143.ngrok-free.app/";
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
