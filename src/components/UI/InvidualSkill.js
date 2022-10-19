import { useState } from "react";
import ReactQuill from "react-quill";

function InvidualSkill(props) {
  const { kyNang } = props;
  const [tenKyNang, setTenKyNang] = useState(kyNang.tenKyNang);
  const [moTa, setMoTa] = useState(kyNang.moTa);

  return (
    <>
      <div className="info-experiment-individual">
        <div className="contain-form-group">
          <div className="form-group">
            <label htmlFor="skillName">Tên kỹ năng</label>
            <input
              type="text"
              id="skillName"
              value={tenKyNang}
              onChange={(e) => {
                setTenKyNang(e.target.value);
                props.capNhatKyNang(kyNang.id, {
                  tenKyNang: e.target.value,
                  moTa,
                });
              }}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: "10px" }}>
          <label htmlFor="">Mô tả</label>
          <ReactQuill
            theme="snow"
            value={moTa}
            onChange={(content) => {
              setMoTa(content);
              props.capNhatKyNang(kyNang.id, {
                tenKyNang,
                moTa: content,
              });
            }}
          />
        </div>

        <button
          className="button button-red mv-20"
          onClick={() => props.xoaKyNang(kyNang.id)}
        >
          Xóa
        </button>
      </div>
    </>
  );
}

export default InvidualSkill;
