import Header from "../Home/Header";
import "./css/User.css";
import "react-quill/dist/quill.snow.css";
import ContainTabs from "../../UI/ContainTabs";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatNguoiDungRD,
  selectNguoiDung,
} from "./../../../store/nguoi-dung-slice";
import { API_URL } from "./../../../api/common-api";
import { useEffect, useRef } from "react";
import {
  capNhatCV,
  capNhatHinhAnhNguoiDung,
} from "./../../../api/nguoi-dung-api";
import { avatar_nguoi_dung } from "../../../utils/image-utils";
import ContainInfo from "../../UI/ContainInfo";
import { useNavigate } from "react-router-dom";

function User(props) {
  const nguoiDung = useSelector(selectNguoiDung);
  const navigate = useNavigate();

  const currentFileHidden = useRef(null);
  const currentFilePDFHidden = useRef(null);
  const cvLink = useRef(null);

  const image = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      capNhatNguoiDungRD(JSON.parse(localStorage.getItem("nguoi-dung")))
    );
  }, []);

  const handleOpenDirectory = () => {
    currentFileHidden.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // set image display
    let reader = new FileReader();
    reader.onload = (e) => {
      image.current.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // save image
    const formData = new FormData();
    formData.append("imageFile", file);

    const result = await capNhatHinhAnhNguoiDung(nguoiDung.id, formData);
    if (result !== "NOT OK") {
      console.log(result);
      dispatch(capNhatNguoiDungRD({ ...nguoiDung, avatar: result }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("nguoi-dung");
    window.location.href = "/";
  };

  const handleUploadPDF = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("cvFile", file);
    const result = await capNhatCV(nguoiDung.id, formData);
    cvLink.current.href = API_URL + "/" + result;
  };

  return (
    <>
      <Header />
      {nguoiDung && (
        <div className="container User-container">
          <div className="left">
            <div className="left-image-container">
              <img
                ref={image}
                src={API_URL + "/" + (nguoiDung.avatar ?? avatar_nguoi_dung)}
                alt=""
              />
              <button
                className="button button-black"
                onClick={handleOpenDirectory}
              >
                Thay ảnh đại diện
              </button>
              <button
                className="button button-blue"
                onClick={() => navigate("/users/projects")}
              >
                Dự án của bạn
              </button>
              <button className="button button-red" onClick={handleLogout}>
                Đăng xuất
              </button>

              <div className="seperate"></div>

              <div>
                <button
                  className="button button-green"
                  onClick={() => currentFilePDFHidden.current.click()}
                >
                  Upload CV
                </button>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="application/pdf"
                  ref={currentFilePDFHidden}
                  onChange={handleUploadPDF}
                />
                {nguoiDung.cv && (
                  <div style={{ textAlign: "center" }}>
                    <a
                      style={{
                        padding: "10px 20px",
                        marginTop: "10px",
                        display: "inline-block",
                        backgroundColor: "#ccc",
                        color: "#333",
                      }}
                      href={API_URL + "/" + nguoiDung.cv}
                      target={"_blank"}
                      ref={cvLink}
                      download
                    >
                      CV của tôi
                    </a>
                  </div>
                )}
              </div>

              <div className="seperate"></div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                Công khai:{" "}
                <input type="checkbox" defaultChecked={nguoiDung.congKhai} />
                <ContainInfo content="Khi bạn nhập đầy đủ thông tin. Tài khoản của bạn sẽ được công khai" />
              </div>

              <input
                ref={currentFileHidden}
                style={{ display: "none" }}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="right">
            <div className="right-info-container">
              <ContainTabs />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
