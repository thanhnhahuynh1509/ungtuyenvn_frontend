import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// const handleChange = (e) => {
//     // console.log();
//     // const file = e.target.files[0];
//     // const test = { name: "abc", message: "This is message for test" };
//     // const testBlob = new Blob([JSON.stringify(test)], {
//     //   type: "application/json",
//     // });
//     // let formData = new FormData();
//     // formData.append("imageFile", file);
//     // formData.append("test", testBlob);
//     // axios.post("//localhost:8080/api/test", formData);
//   };
