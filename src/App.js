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
import { Stomp } from "@stomp/stompjs";
import { updateStomp } from "./store/stomp-slice";
import SockJS from "sockjs-client";
import { updateHasNew } from "./store/notification-slice";
import { capNhapNguoiDung } from "./api/nguoi-dung-api";

function App() {
  const dispatch = useDispatch();
  let stomp = null;

  const capNhat = async (user) => {
    const nguoiDung = await capNhapNguoiDung(JSON.parse(user));
    delete nguoiDung.matKhau;
    localStorage.setItem("nguoi-dung", JSON.stringify(nguoiDung));
    dispatch(capNhatNguoiDungRD(nguoiDung));
    return nguoiDung;
  };

  useEffect(() => {
    const initUser = async () => {
      const user = await layNguoiDungVaCapNhatToken(
        localStorage.getItem("jwt-token")
      );

      const sockjs = new SockJS("//localhost:8080/ws");
      stomp = Stomp.over(sockjs);

      console.log(stomp);

      dispatch(updateStomp(stomp));

      stomp.connect({}, () => {
        stomp.subscribe("/topic/" + user.id, (message) => {
          dispatch(updateHasNew(true));
          capNhat(message.body);
        });
      });

      dispatch(capNhatNguoiDungRD(user));
    };

    initUser();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Routes>
        <Route path="/" element={<Home stomp={stomp} />} />
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
