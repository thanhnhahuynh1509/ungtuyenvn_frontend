import ReactQuill from "react-quill";
import { API_URL } from "../../api/common-api";
import { project_image } from "../../utils/image-utils";
import ModalBig from "./ModelBig";
import { useRef, useState } from "react";
import { luuDuAnNguoiDung } from "../../api/nguoi-dung-api";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatNguoiDungRD,
  selectNguoiDung,
} from "./../../store/nguoi-dung-slice";

function ModalBigAddProject(props) {
  const nguoiDung = useSelector(selectNguoiDung);
  const dispatch = useDispatch();
  const [tenDuAn, setTenDuAn] = useState();
  const [moTa, setMoTa] = useState();
  const [filePrimary, setFilePrimary] = useState(); // use this to save primary image
  const [fileOptionals, setFileOptionals] = useState([]); // use this to save image optional

  const primaryImage = useRef();
  const primaryImageFile = useRef();
  const optionalFile = useRef();

  const handleClickImageFile = () => {
    primaryImageFile.current.click();
  };

  const handlePrimaryImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setFilePrimary(file);
    reader.onload = (e) => {
      primaryImage.current.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const openOptionalImage = () => {
    optionalFile.current.click();
  };

  const addOptionalImage = (e) => {
    const files = e.target.files;
    setFileOptionals([...fileOptionals, ...files]);
  };

  const deleteOptionalImage = (f) => {
    setFileOptionals([...fileOptionals.filter((m) => m !== f)]);
  };

  const renderImageOptionals = () => {
    return fileOptionals.map((f, index) => {
      return (
        <div key={index} className="image-optional">
          <button
            className="button button-red"
            onClick={() => deleteOptionalImage(f)}
          >
            X
          </button>
          <img src={URL.createObjectURL(f)} alt="" />
        </div>
      );
    });
  };

  const luuDuAn = async () => {
    const formData = new FormData();

    if (filePrimary) {
      console.log("okl");
      formData.append("primaryImageFile", filePrimary);
    }

    if (fileOptionals.length > 0) {
      console.log("ok");
      for (let fileOptional of fileOptionals) {
        formData.append("optionalImageFiles", fileOptional);
      }
    }
    formData.append(
      "duAn",
      new Blob([JSON.stringify({ tenDuAn, moTa })], {
        type: "application/json",
      })
    );

    const user = await luuDuAnNguoiDung(nguoiDung.id, formData);
    localStorage.setItem("nguoi-dung", JSON.stringify(user));
    dispatch(capNhatNguoiDungRD(user));

    window.location.reload();
  };

  return (
    <>
      <ModalBig open={props.isOpen} onClose={props.closeModal}>
        <div className="Project-add-header">
          <div className="Tabs-title">
            <h3>Thêm Dự Án</h3>
          </div>
          <button className="button button-red" onClick={props.closeModal}>
            X
          </button>
        </div>

        <div className="Project-add-content">
          <div className="contain-form-group">
            <div className="form-group">
              <label htmlFor="skillName">Tên dự án</label>
              <input
                type="text"
                value={tenDuAn}
                onChange={(e) => setTenDuAn(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="">Mô tả</label>
            <ReactQuill
              theme="snow"
              value={moTa}
              onChange={(content) => setMoTa(content)}
            />
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <img
              src={API_URL + "/" + project_image}
              alt=""
              style={{ width: "300px", height: "200px", objectFit: "contain" }}
              ref={primaryImage}
            />
            <button
              className="button button-blue"
              style={{ width: "max-content", padding: "10px 20px" }}
              onClick={handleClickImageFile}
            >
              Cập nhật hình ảnh chính
            </button>
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              ref={primaryImageFile}
              onChange={handlePrimaryImageChange}
            />
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <div className="contain-image-optional">
              {renderImageOptionals()}
            </div>
            <button
              className="button button-blue"
              style={{ width: "max-content", padding: "10px 20px" }}
              onClick={openOptionalImage}
            >
              Thêm hình ảnh bổ sung
            </button>
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              ref={optionalFile}
              value=""
              onChange={addOptionalImage}
              multiple
            />
          </div>
        </div>

        <div className="Project-add-footer">
          <button className="button button-black" onClick={props.closeModal}>
            Thoát
          </button>
          <button
            className="button button-green"
            onClick={() => {
              luuDuAn();
              props.closeModal();
            }}
          >
            Lưu
          </button>
        </div>
      </ModalBig>
    </>
  );
}

export default ModalBigAddProject;
