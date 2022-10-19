import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dangNhap } from "../../../api/tai-khoan-api";
import "./css/Login.css";
import { layNguoiDungVaCapNhatToken } from "../../../api/common-api";
import { layNguoiDung } from "../../../api/nguoi-dung-api";
import { useDispatch } from "react-redux";
import { updateModal } from "../../../store/modal-slice";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modal = {
      title: "Đăng ký thành công",
      message:
        "Chúc mừng bạn đã đăng ký thành công. Bạn có muốn chuyển đến trang đăng nhập không?",
      icon: (
        <i
          style={{ color: "green" }}
          className="fa-regular fa-circle-check"
        ></i>
      ),
      hide: false,
      handleAccept: () => {},
      handleCancel: () => {},
    };
    try {
      const token = await dangNhap({ email: email, matKhau: password });
      localStorage.setItem("jwt-token", token);
      layNguoiDungVaCapNhatToken(token);
      navigate("/", { replace: true });
      window.location.reload();
    } catch (exception) {
      modal.title = "Oop! Có lỗi xảy ra";
      modal.message = "Tên tài khoản hoặc mật khẩu không đúng";
      modal.icon = (
        <i style={{ color: "red" }} className="fa-regular fa-circle-xmark"></i>
      );
      dispatch(updateModal(modal));
    }
  };

  return (
    <>
      <div className="Login">
        <div className="Login-contain-form">
          <div className="Login-logo">
            <Link to={"/"}>
              <h2>UngTuyen</h2>
            </Link>
          </div>

          <form action="" onSubmit={handleSubmit} className="Login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                placeholder=""
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="Login-contain-options">
              <div className="option">
                <button
                  className="button button-blue Login-button"
                  type="button"
                >
                  <i className="fa-brands fa-facebook"></i>
                </button>
              </div>
              <div className="option">
                <button
                  className="button button-red Login-button"
                  type="button"
                >
                  <i className="fa-brands fa-google"></i>
                </button>
              </div>
              <div className="option">
                <button
                  className="button button-black Login-button"
                  type="button"
                >
                  <i className="fa-brands fa-github"></i>
                </button>
              </div>
            </div>
            <button className="button button-primary Login-button">
              Đăng nhập
            </button>
            <Link style={{ textAlign: "center" }} to={"/sign_up"}>
              Tạo tài khoản mới
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
