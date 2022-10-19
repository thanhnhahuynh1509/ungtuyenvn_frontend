import { Route, Routes } from "react-router-dom";
import { layNguoiDungVaCapNhatToken } from "./api/common-api";
import Home from "./components/Layout/Home/Home";
import Login from "./components/Layout/Login/Login";
import SignUp from "./components/Layout/SignUp/SignUp";
import User from "./components/Layout/User/User";
import Modal from "./components/UI/Modal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { capNhatNguoiDungRD } from "./store/nguoi-dung-slice";
import Project from "./components/Layout/Project/Project";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initUser = async () => {
      const user = await layNguoiDungVaCapNhatToken(
        localStorage.getItem("jwt-token")
      );

      dispatch(capNhatNguoiDungRD(user));
    };

    initUser();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/projects" element={<Project />} />
      </Routes>

      <Modal />
    </div>
  );
}

export default App;
