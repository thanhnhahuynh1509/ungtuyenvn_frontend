import { useNavigate } from "react-router-dom";
import "./css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNguoiDung } from "./../../../store/nguoi-dung-slice";
import { API_URL } from "./../../../api/common-api";
import { avatar_nguoi_dung } from "./../../../utils/image-utils";
import { useEffect, useState } from "react";
import { layTatCaLoaiNguoiDung } from "../../../api/loai-nguoi-dung-api";
import { layTatCaNguoiDung } from "./../../../api/nguoi-dung-api";
import {
  selectHasNewNotification,
  updateHasNew,
} from "./../../../store/notification-slice";
import ModalBig from "../../UI/ModelBig";

function Header(props) {
  const navigate = useNavigate();
  const nguoiDung = useSelector(selectNguoiDung);
  const hasNewNotification = useSelector(selectHasNewNotification);
  const [danhSachLoaiNguoiDung, setDanhSachLoaiNguoiDung] = useState([]);
  const [city, setCity] = useState("0");
  const [position, setPosition] = useState("0");
  const [keyword, setKeyword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  const { nguoiDungs, setNguoiDungs } = props;

  const redirectToLogin = () => {
    navigate("/sign_in");
  };

  const redirectToUser = () => {
    navigate("/users");
  };

  const searchUsers = async () => {
    let listTemp = await layTatCaNguoiDung();

    if (city !== "0") {
      listTemp = listTemp.filter((m) => m.thanhPho === city);
    }
    if (position !== "0") {
      console.log(position);
      listTemp = listTemp.filter((m) => {
        return m.loaiNguoiDung.id == position;
      });
    }

    if (keyword.length > 0) {
      listTemp = listTemp.filter((m) => {
        return (
          (m.ho + " " + m.ten + " " + m.tieuDeUngTuyen).includes(keyword) ||
          m.chuyenMons.filter((c) =>
            c.tenChuyenMon.toUpperCase().includes(keyword.toUpperCase())
          ).length > 0
        );
      });
    }

    setNguoiDungs([...listTemp]);
  };

  useEffect(() => {
    const init = async () => {
      setDanhSachLoaiNguoiDung(await layTatCaLoaiNguoiDung());
    };

    init();
  }, []);

  const handleNotification = () => {
    dispatch(updateHasNew(false));
    setShowNotification(true);
  };

  return (
    <>
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
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <select
                  style={{ cursor: "pointer" }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="0">Tất cả thành phố</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Khác">Khác</option>
                </select>
                <select
                  style={{ cursor: "pointer" }}
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="0">Tất cả cấp độ</option>
                  {danhSachLoaiNguoiDung.map((m) => {
                    return (
                      <option key={m.id} value={m.id}>
                        {m.tenLoai}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="Header-search-button button button-primary"
                  onClick={searchUsers}
                >
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
                    <button
                      className="button button-blue"
                      style={{ position: "relative" }}
                      onClick={handleNotification}
                    >
                      <i className="fa-regular fa-bell"></i>
                      {hasNewNotification && (
                        <i
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            color: "var(--primary-color)",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                          }}
                          className="fa-solid fa-circle-info"
                        ></i>
                      )}
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

      {nguoiDung && (
        <ModalBig
          open={showNotification}
          onClose={() => {
            setShowNotification(false);
          }}
        >
          <h2 style={{ textAlign: "center" }}>Thông báo</h2>
          <div>
            {nguoiDung.thongBaos.length > 0 && (
              <div>
                {nguoiDung.thongBaos.map((m) => {
                  return (
                    <div
                      key={m.id}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#eee",
                        borderRadius: "4px",
                        margin: "10px 0px",
                      }}
                    >
                      <h4>{m.tieuDe}</h4>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#333",
                          marginBottom: "10px",
                          display: "inline-block",
                        }}
                      >
                        {m.ngayThongBao}
                      </span>
                      <p>{m.noiDung}</p>
                    </div>
                  );
                })}
              </div>
            )}
            {nguoiDung.thongBaos.length == 0 && (
              <div style={{ textAlign: "center" }}>
                Bạn chưa có thông báo nào
              </div>
            )}
          </div>
        </ModalBig>
      )}
    </>
  );
}

export default Header;
