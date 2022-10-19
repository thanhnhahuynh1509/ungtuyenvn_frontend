import { useState } from "react";
import ReactQuill from "react-quill";

function InvidualJob(props) {
  const { hoSo } = props;
  const [tenCongViec, setTenCongViec] = useState(hoSo.tenCongViec);
  const [ngayBatDau, setNgayBatDau] = useState(hoSo.ngayBatDau);
  const [ngayKetThuc, setNgayKetThuc] = useState(hoSo.ngayKetThuc);
  const [moTa, setMoTa] = useState(hoSo.moTa);

  return (
    <>
      <div className="info-experiment-individual">
        <div className="contain-form-group">
          <div className="form-group">
            <label htmlFor="jobName">Tên công việc</label>
            <input
              type="text"
              id="jobName"
              value={tenCongViec}
              onChange={(e) => {
                setTenCongViec(e.target.value);
                props.capNhatHoSo(hoSo.id, {
                  tenCongViec: e.target.value,
                  ngayBatDau,
                  ngayKetThuc,
                  moTa,
                });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Ngày bắt đầu</label>
            <input
              type="date"
              id="startDate"
              value={ngayBatDau}
              onChange={(e) => {
                setNgayBatDau(e.target.value);
                props.capNhatHoSo(hoSo.id, {
                  tenCongViec,
                  ngayBatDau: e.target.value,
                  ngayKetThuc,
                  moTa,
                });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Ngày kết thúc</label>
            <input
              type="date"
              id="endDate"
              value={ngayKetThuc}
              onChange={(e) => {
                setNgayKetThuc(e.target.value);
                props.capNhatHoSo(hoSo.id, {
                  tenCongViec,
                  ngayKetThuc: e.target.value,
                  ngayBatDau,
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
              props.capNhatHoSo(hoSo.id, {
                tenCongViec,
                ngayBatDau,
                ngayKetThuc,
                moTa: content,
              });
            }}
          />
        </div>

        <button
          className="button button-red mv-20"
          onClick={() => {
            console.log(hoSo.id);
            props.xoaHoSo(hoSo.id);
          }}
        >
          Xóa
        </button>
      </div>
    </>
  );
}

export default InvidualJob;
