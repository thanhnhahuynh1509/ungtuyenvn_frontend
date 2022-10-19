import { useNavigate } from "react-router-dom";
import "./css/Header.css";
import { useSelector } from "react-redux";
import { selectNguoiDung } from "./../../../store/nguoi-dung-slice";
import { API_URL } from "./../../../api/common-api";
import { avatar_nguoi_dung } from "./../../../utils/image-utils";

function Header(props) {
  const navigate = useNavigate();
  const nguoiDung = useSelector(selectNguoiDung);
  const redirectToLogin = () => {
    navigate("/sign_in");
  };

  const redirectToUser = () => {
    navigate("/users");
  };

  return (
    <header className="Header">
      <div className="container Header-container">
        <div className="Header-content">
          <div className="Header-logo" onClick={() => navigate("/")}>
            <h2>UngTuyen</h2>
          </div>

          <div className="Header-search">
            <div className="Header-search-box">
              <input
                placeholder="Tìm kiếm theo kỹ năng, tên,..."
                type="search"
              />
              <select style={{ cursor: "pointer" }}>
                <option value="">Tất cả thành phố</option>
                <option value="">Hồ Chí Minh</option>
                <option value="">Hà Nội</option>
                <option value="">Đà Nẵng</option>
                <option value="">Khác</option>
              </select>
              <select style={{ cursor: "pointer" }}>
                <option value="">Tất cả cấp độ</option>
                <option value="">Thực tập</option>
                <option value="">Fresher</option>
                <option value="">Junior</option>
                <option value="">Middle</option>
                <option value="">Senior</option>
                <option value="">Technical Leader</option>
                <option value="">Project Manager</option>
                <option value="">CTO</option>
                <option value="">CEO</option>
              </select>
              <button className="Header-search-button button button-primary">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div className="Header-features">
            {!nguoiDung && (
              <button
                className="Header-button button button-primary"
                onClick={redirectToLogin}
              >
                Đăng Nhập
              </button>
            )}
            {nguoiDung && (
              <div className="Header-user">
                <div className="Header-message">
                  <button className="button button-blue">
                    <i className="fa-regular fa-message"></i>
                  </button>
                </div>
                <div className="Header-avatar" onClick={redirectToUser}>
                  <img
                    src={
                      API_URL + "/" + (nguoiDung.avatar ?? avatar_nguoi_dung)
                    }
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
