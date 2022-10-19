import { useState } from "react";

function Contact(props) {
  const { thongTin } = props;
  const [diaChi, setDiaChi] = useState(thongTin.giaTriThongTin);
  const [ten, setTen] = useState(thongTin.tenThongTin);

  return (
    <>
      <div className="contain-form-group" style={{ margin: "10px 0px" }}>
        <div className="form-group">
          <label>Tên</label>
          <input
            type="text"
            placeholder="facebook, email,..."
            value={ten}
            onChange={(e) => {
              setTen(e.target.value);
              props.capNhatThongTin(thongTin.id, {
                tenThongTin: e.target.value,
                giaTriThongTin: diaChi,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            value={diaChi}
            onChange={(e) => {
              setDiaChi(e.target.value);
              props.capNhatThongTin(thongTin.id, {
                tenThongTin: ten,
                giaTriThongTin: e.target.value,
              });
            }}
          />
        </div>

        <button
          className="button button-red"
          style={{ alignSelf: "center" }}
          onClick={() => {
            props.xoaThongTin(thongTin.id);
          }}
        >
          Xóa
        </button>
      </div>
    </>
  );
}

export default Contact;
