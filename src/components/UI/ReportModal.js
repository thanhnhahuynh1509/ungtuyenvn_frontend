import { useState } from "react";
import ReactQuill from "react-quill";
import ModalBig from "./ModelBig";
import { luuBaoCao } from "./../../api/bao-cao-api";

function ReportModal(props) {
  const { open, setOpen } = props;
  const [tieuDe, setTieuDe] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const onClose = () => {
    setOpen(false);
  };

  const onSaveReport = (e) => {
    e.preventDefault();
    const baoCao = { tieuDe, noiDung };
    luuBaoCao(props.userId, baoCao);
    onClose();
  };

  return (
    <ModalBig open={open} onClose={onClose}>
      <h3 style={{ textAlign: "center", margin: "20px 0px" }}>
        Report người dùng
      </h3>
      <form action="" onSubmit={onSaveReport}>
        <div className="form-group">
          <label htmlFor="firstName">Tiêu đề</label>
          <input
            type="text"
            id="firstName"
            value={tieuDe}
            onChange={(e) => setTieuDe(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ margin: "20px 0px" }}>
          <label htmlFor="firstName">Nội dung</label>
          <ReactQuill
            theme="snow"
            value={noiDung}
            onChange={(content) => setNoiDung(content)}
          />
        </div>

        <div
          className="contain-buttons"
          style={{ display: "flex", gap: "20px", margin: "20px 0px" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="button button-black User-button"
          >
            Hủy
          </button>
          <button className="button button-red User-button">báo cáo</button>
        </div>
      </form>
    </ModalBig>
  );
}

export default ReportModal;
