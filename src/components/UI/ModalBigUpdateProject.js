import ModalBig from "./ModelBig";
import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "./../../api/common-api";
import { project_image } from "../../utils/image-utils";
import { capNhatDuAnNguoiDung } from "./../../api/nguoi-dung-api";
import { capNhatNguoiDungRD } from "../../store/nguoi-dung-slice";
import { useDispatch, useSelector } from "react-redux";
import { selectNguoiDung } from "./../../store/nguoi-dung-slice";
import { xoaDuAn } from "./../../api/du-an-api";

function ModalBigUpdateProject(props) {
  const [duAn, setDuAn] = useState({});
  const dispatch = useDispatch();
  const nguoiDung = useSelector(selectNguoiDung);
  const p = props.duAn;

  useEffect(() => {
    setDuAn({ ...p });
  }, [p]);

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

  const deleteOptionalImageFile = (f) => {
    setFileOptionals([...fileOptionals.filter((m) => m !== f)]);
  };

  const deleteOptionalImage = (id) => {
    setDuAn({
      ...duAn,
      hinhAnhDuAns: [...duAn.hinhAnhDuAns.filter((m) => m.id !== id)],
    });
  };

  const renderImageOptionalFiles = () => {
    return fileOptionals.map((f, index) => {
      return (
        <div key={index} className="image-optional">
          <button
            className="button button-red"
            onClick={() => deleteOptionalImageFile(f)}
          >
            X
          </button>
          <img src={URL.createObjectURL(f)} alt="" />
        </div>
      );
    });
  };

  const renderImageOptionals = () => {
    if (duAn && duAn.hinhAnhDuAns) {
      return duAn.hinhAnhDuAns.map((h) => {
        return (
          <div key={h.id} className="image-optional">
            <button
              className="button button-red"
              onClick={() => deleteOptionalImage(h.id)}
            >
              X
            </button>
            <img src={API_URL + "/" + h.lienKet} alt="" />
          </div>
        );
      });
    } else {
      return <></>;
    }
  };

  const capNhat = async () => {
    const formData = new FormData();

    if (filePrimary) {
      formData.append("primaryImageFile", filePrimary);
    }

    if (fileOptionals.length > 0) {
      for (let fileOptional of fileOptionals) {
        formData.append("optionalImageFiles", fileOptional);
      }
    }
    formData.append(
      "duAn",
      new Blob([JSON.stringify(duAn)], {
        type: "application/json",
      })
    );

    const user = await capNhatDuAnNguoiDung(nguoiDung.id, duAn.id, formData);
    localStorage.setItem("nguoi-dung", JSON.stringify(user));
    dispatch(capNhatNguoiDungRD(user));

    window.location.reload();
  };

  const xuLyXoaDuAn = () => {
    console.log("duan " + duAn.id);
    xoaDuAn(duAn.id);
    window.location.reload();
  };

  return (
    <>
      <ModalBig open={props.isOpen} onClose={props.closeModal}>
        <div className="Project-add-header">
          <div className="Tabs-title">
            <h3>Cập nhật Dự Án</h3>
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
                value={duAn.tenDuAn}
                onChange={(e) => setDuAn({ ...duAn, tenDuAn: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="">Mô tả</label>
            <ReactQuill
              theme="snow"
              value={duAn.moTa}
              onChange={(content) => setDuAn({ ...duAn, moTa: content })}
            />
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <img
              src={API_URL + "/" + (duAn.hinhAnh ?? project_image)}
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
              {renderImageOptionalFiles()}
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
            className="button button-red"
            onClick={() => {
              props.closeModal();
              xuLyXoaDuAn();
            }}
          >
            Xóa dự án
          </button>
          <button
            className="button button-green"
            onClick={() => {
              capNhat();
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

export default ModalBigUpdateProject;
