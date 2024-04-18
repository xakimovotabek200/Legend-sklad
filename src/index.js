import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const token = sessionStorage.getItem("token");

axios.defaults.baseURL = "http://37.77.104.188:8080/api/v1/";
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
