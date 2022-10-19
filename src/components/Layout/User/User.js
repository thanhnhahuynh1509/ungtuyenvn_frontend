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
import { useRef } from "react";
import { capNhatHinhAnhNguoiDung } from "./../../../api/nguoi-dung-api";
import { avatar_nguoi_dung } from "../../../utils/image-utils";

function User(props) {
  const nguoiDung = useSelector(selectNguoiDung);
  const currentFileHidden = useRef(null);
  const image = useRef(null);
  const dispatch = useDispatch();

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

  return (
    <>
      <Header />
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
              onClick={() => (window.location.href = "/users/projects")}
            >
              Dự án của bạn
            </button>
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
    </>
  );
}

export default User;
