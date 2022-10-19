import { useState } from "react";

function Specialize(props) {
  const { list, chuyenMon } = props;
  const [id, setId] = useState(chuyenMon.id);
  return (
    <>
      <div className="form-group">
        <select
          name=""
          id="position"
          style={{ cursor: "pointer" }}
          value={id}
          onChange={(e) => {
            props.capNhatChuyenMon(id, e.target.value);
            setId(e.target.value);
          }}
        >
          {list.map((m) => (
            <option key={m.id} value={m.id}>
              {m.tenChuyenMon}
            </option>
          ))}
        </select>
        <button
          className="button button-red"
          onClick={() => props.xoaChuyenMon(chuyenMon.id)}
        >
          Xóa
        </button>
      </div>
    </>
  );
}

export default Specialize;
