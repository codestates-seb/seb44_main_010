// import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Nav from "../src/components/default/Nav";

import ContentWithFooter from "./ContentWithFooter";
import axios from "axios";

import { getLocalstorage } from "./util/localStorage";
const acessToken = getLocalstorage("acessToken");

axios.defaults.headers.common["Authorization"] = acessToken;

axios.defaults.baseURL = "http://3.36.165.60:8080/";
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
