import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
axios.defaults.baseURL = "http://139.59.73.2:5000";

ReactDOM.render(<App />, document.getElementById("root"));
