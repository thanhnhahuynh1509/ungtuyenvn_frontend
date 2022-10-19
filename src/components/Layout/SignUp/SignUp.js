import { Link, useNavigate } from "react-router-dom";
import "./css/SignUp.css";
import { useState } from "react";
import { dangKy } from "../../../api/tai-khoan-api";
import { useDispatch } from "react-redux";
import { updateModal } from "../../../store/modal-slice";

function SignUp(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
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
      handleAccept: () => {
        navigate("/sign_in", { replace: true });
      },
      handleCancel: () => {},
    };

    try {
      const user = { email, matKhau: password, ho: lastName, ten: firstName };
      const response = await dangKy(user);
      dispatch(updateModal(modal));
    } catch (exception) {
      modal.title = "Oop! Có lỗi xảy ra";
      modal.message = "Email đã tồn tại, vui lòng xử dụng email khác";
      modal.icon = (
        <i style={{ color: "red" }} className="fa-regular fa-circle-xmark"></i>
      );
      dispatch(updateModal(modal));
    }
  };

  return (
    <>
      <div className="SignUp">
        <div className="SignUp-contain-form">
          <div className="SignUp-logo">
            <Link to={"/"}>
              <h2>UngTuyen</h2>
            </Link>
          </div>

          <form action="" onSubmit={handleSubmit} className="SignUp-form">
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
            <div className="contain-form-group">
              <div className="form-group">
                <label htmlFor="lastName">Họ</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder=""
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">Tên</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder=""
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                placeholder=""
                min={"8"}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="re-password">Nhập lại mật khẩu</label>
              <input type="password" id="re-password" placeholder="" required />
            </div>

            <button className="button button-primary SignUp-button">
              Đăng ký
            </button>
            <Link style={{ textAlign: "center" }} to={"/sign_in"}>
              Quay lại trang đăng nhập
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
