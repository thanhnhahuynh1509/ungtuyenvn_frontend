import Tabs from "./Tab";
import "./css/ContainTabs.css";
import ReactQuill from "react-quill";
import InvidualSkill from "./InvidualSkill";
import InvidualJob from "./InvidualJob";
import Specialize from "./Specialize";
import Contact from "./Contact";
import { useEffect, useState } from "react";
import { layTatCaLoaiNguoiDung } from "../../api/loai-nguoi-dung-api";
import { capNhapNguoiDung } from "./../../api/nguoi-dung-api";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../../store/modal-slice";
import {
  capNhatNguoiDungRD,
  selectNguoiDung,
} from "./../../store/nguoi-dung-slice";
import { layTatCaChuyenMon } from "../../api/chuyen-mon-api";

let identity = 1;

function ContainTabs(props) {
  const nguoiDung = useSelector(selectNguoiDung);
  const dispatch = useDispatch();

  const modal = {
    title: "Thông báo",
    message: "Lưu thông tin thành công",
    icon: (
      <i style={{ color: "green" }} className="fa-regular fa-circle-check"></i>
    ),
    hide: false,
    handleAccept: () => {},
    handleCancel: () => {},
  };

  // nguoi dung
  const [ten, setTen] = useState(nguoiDung.ten);
  const [ho, setHo] = useState(nguoiDung.ho);
  const [thanhPho, setThanhPho] = useState(nguoiDung.thanhPho);
  const [loaiNguoiDung, setLoaiNguoiDung] = useState(
    nguoiDung.loaiNguoiDung.id
  );
  const [tieuDeUngTuyen, setTieuDeUngTuyen] = useState(
    nguoiDung.tieuDeUngTuyen
  );
  const [lyDoLamViec, setLyDoLamViec] = useState(nguoiDung.lyDoLamViecVoiToi);
  const [gioiThieuBanThan, setGioiThieuBanThan] = useState(nguoiDung.moTa);
  const [danhSachLoaiNguoiDung, setDanhSachLoaiNguoiDung] = useState([]);
  const [danhSachHoSoLamViec, setDanhSachHoSoLamViec] = useState(
    nguoiDung.hoSoLamViecs
  );
  const [danhSachKyNang, setDanhSachKyNang] = useState(
    nguoiDung.kyNangLamViecs
  );

  const [danhSachChuyenMon, setDanhSachChuyenMon] = useState([]);
  const [danhSachChuyenMonNguoiDung, setDanhSachChuyenMonNguoiDung] = useState(
    nguoiDung.chuyenMons
  );
  const [danhSachThongTinLienLac, setDanhSachThongTinLienLac] = useState(
    nguoiDung.thongTinLienLacs
  );

  // khoi tao
  useEffect(() => {
    const init = async () => {
      setDanhSachLoaiNguoiDung(await layTatCaLoaiNguoiDung());
      setDanhSachChuyenMon(await layTatCaChuyenMon());
    };

    init();
  }, []);

  // chuc nang

  const generateDate = () => {
    const date = new Date();
    const id =
      date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + "";
    date.getMilliseconds();
    return id + "" + identity++;
  };

  const capNhat = async (user) => {
    const nguoiDung = await capNhapNguoiDung(user);
    delete nguoiDung.matKhau;
    localStorage.setItem("nguoi-dung", JSON.stringify(nguoiDung));
    dispatch(capNhatNguoiDungRD(nguoiDung));
    dispatch(updateModal(modal));
    return nguoiDung;
  };

  const luuThongTinCoBan = async (e) => {
    e.preventDefault();
    const user = {
      ...nguoiDung,
      ten,
      ho,
      thanhPho,
      tieuDeUngTuyen,
      loaiNguoiDung: { id: loaiNguoiDung },
    };

    await capNhat(user);
  };

  const luuLyDo = async () => {
    const user = {
      ...nguoiDung,
      lyDoLamViecVoiToi: lyDoLamViec,
    };

    await capNhat(user);
  };

  const luuMoTa = async () => {
    const user = {
      ...nguoiDung,
      moTa: gioiThieuBanThan,
    };

    await capNhat(user);
  };

  // Ho so

  const themHoSo = () => {
    setDanhSachHoSoLamViec([...danhSachHoSoLamViec, { id: generateDate() }]);
  };

  const capNhatHoSo = (id, data) => {
    const ds = danhSachHoSoLamViec.map((m) => {
      if (m.id === id) {
        return { id: id, ...data };
      }
      return m;
    });
    setDanhSachHoSoLamViec(ds);
  };

  const xoaHoSo = (id) => {
    setDanhSachHoSoLamViec([...danhSachHoSoLamViec.filter((m) => m.id !== id)]);
  };

  const luuHoSo = async () => {
    const user = {
      ...nguoiDung,
      hoSoLamViecs: danhSachHoSoLamViec,
    };
    const data = await capNhat(user);
    setDanhSachHoSoLamViec(data.hoSoLamViecs);
  };

  // Ky Nang

  const luuKyNang = async () => {
    const user = {
      ...nguoiDung,
      kyNangLamViecs: danhSachKyNang,
    };
    const data = await capNhat(user);
    setDanhSachKyNang(data.kyNangLamViecs);
  };

  const capNhatKyNang = (id, data) => {
    const ds = danhSachKyNang.map((m) => {
      if (m.id === id) {
        return { id, ...data };
      }
      return m;
    });
    setDanhSachKyNang([...ds]);
  };

  const themKyNang = () => {
    setDanhSachKyNang([...danhSachKyNang, { id: generateDate() }]);
  };

  const xoaKyNang = (id) => {
    setDanhSachKyNang([...danhSachKyNang.filter((m) => m.id !== id)]);
  };

  // chuyen mon

  const luuChuyenMon = async () => {
    const user = {
      ...nguoiDung,
      chuyenMons: danhSachChuyenMonNguoiDung,
    };
    const data = await capNhat(user);
    setDanhSachChuyenMonNguoiDung(data.chuyenMons);
  };

  const themChuyenMon = () => {
    setDanhSachChuyenMonNguoiDung([
      ...danhSachChuyenMonNguoiDung,
      { id: generateDate() },
    ]);
  };

  const capNhatChuyenMon = (id, data) => {
    const ds = danhSachChuyenMonNguoiDung.map((m) => {
      if (m.id === id) {
        return { id: data };
      }
      return m;
    });
    setDanhSachChuyenMonNguoiDung([...ds]);
  };

  const xoaChuyenMon = (id) => {
    setDanhSachChuyenMonNguoiDung([
      ...danhSachChuyenMonNguoiDung.filter((m) => m.id !== id),
    ]);
  };

  // thong tin lien lac
  const luuThongTinLienLac = async () => {
    const user = {
      ...nguoiDung,
      thongTinLienLacs: danhSachThongTinLienLac,
    };
    const data = await capNhat(user);
    setDanhSachThongTinLienLac(data.thongTinLienLacs);
  };

  const themThongTinLienLac = () => {
    setDanhSachThongTinLienLac([
      ...danhSachThongTinLienLac,
      { id: generateDate() },
    ]);
  };

  const capNhatThongTinLienLac = (id, data) => {
    const ds = danhSachThongTinLienLac.map((m) => {
      if (m.id === id) {
        return { id, ...data };
      }
      return m;
    });
    setDanhSachThongTinLienLac([...ds]);
  };

  const xoaThongTinLienLac = (id) => {
    setDanhSachThongTinLienLac([
      ...danhSachThongTinLienLac.filter((m) => m.id !== id),
    ]);
  };

  // custom Quill

  const modules = {
    toolbar: [[{ list: "bullet" }]],
  };

  return (
    <>
      <div className="ContainTabs">
        <Tabs title={"Thông tin cơ bản"}>
          <form action="" onSubmit={luuThongTinCoBan}>
            <div className="contain-form-group">
              <div className="form-group">
                <label htmlFor="firstName">Tên</label>
                <input
                  type="text"
                  id="firstName"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Họ</label>
                <input
                  type="text"
                  id="lastName"
                  value={ho}
                  onChange={(e) => setHo(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Thành phố</label>
                <select
                  name=""
                  id="address"
                  style={{ cursor: "pointer" }}
                  value={thanhPho}
                  onChange={(e) => setThanhPho(e.target.value)}
                  required
                >
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="position">Vị trí ứng tuyển</label>
                <select
                  name=""
                  id="position"
                  style={{ cursor: "pointer" }}
                  value={loaiNguoiDung}
                  onChange={(e) => setLoaiNguoiDung(e.target.value)}
                  required
                >
                  {danhSachLoaiNguoiDung.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.tenLoai}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "10px" }}>
              <label htmlFor="lastName">Tiêu đề ứng tuyển</label>
              <input
                type="text"
                id="lastName"
                value={tieuDeUngTuyen}
                onChange={(e) => setTieuDeUngTuyen(e.target.value)}
                required
              />
            </div>
            <button
              style={{ margin: "20px 0px" }}
              className="button button-green User-button"
            >
              Lưu thông tin
            </button>
          </form>
        </Tabs>

        <Tabs title={"Lý do làm việc với tôi"}>
          <ReactQuill
            theme="snow"
            value={lyDoLamViec}
            modules={modules}
            onChange={(content) => {
              setLyDoLamViec(content);
            }}
          />
          <button
            style={{ margin: "20px 0px" }}
            className="button button-green User-button"
            onClick={luuLyDo}
          >
            Lưu thông tin
          </button>
        </Tabs>

        <Tabs title={"Giới thiệu bản thân"}>
          <ReactQuill
            theme="snow"
            value={gioiThieuBanThan}
            onChange={(content) => {
              setGioiThieuBanThan(content);
            }}
          />
          <button
            style={{ margin: "20px 0px" }}
            className="button button-green User-button"
            onClick={luuMoTa}
          >
            Lưu thông tin
          </button>
        </Tabs>

        <Tabs title={"Hồ sơ làm việc"}>
          {danhSachHoSoLamViec.map((m) => {
            return (
              <InvidualJob
                key={m.id}
                hoSo={m}
                xoaHoSo={xoaHoSo}
                capNhatHoSo={capNhatHoSo}
              />
            );
          })}
          <button
            className="button button-blue User-button"
            style={{ width: "max-content" }}
            onClick={themHoSo}
          >
            Thêm hồ sơ
          </button>
          <button
            style={{ margin: "10px 0px" }}
            className="button button-green User-button"
            onClick={luuHoSo}
          >
            Lưu thông tin
          </button>
        </Tabs>

        <Tabs title={"Kỹ năng làm việc"}>
          {danhSachKyNang.map((m) => {
            return (
              <InvidualSkill
                key={m.id}
                kyNang={m}
                xoaKyNang={xoaKyNang}
                capNhatKyNang={capNhatKyNang}
              />
            );
          })}

          <button
            className="button button-blue User-button"
            style={{ width: "max-content" }}
            onClick={themKyNang}
          >
            Thêm kỹ năng
          </button>
          <button
            style={{ margin: "10px 0px" }}
            className="button button-green User-button"
            onClick={luuKyNang}
          >
            Lưu thông tin
          </button>
        </Tabs>

        <Tabs title={"Chuyên môn"}>
          <div className="info-specialize info">
            <div className="contain-form-group flex-wrap">
              {danhSachChuyenMonNguoiDung.map((m) => {
                return (
                  <Specialize
                    key={m.id}
                    chuyenMon={m}
                    list={danhSachChuyenMon}
                    xoaChuyenMon={xoaChuyenMon}
                    capNhatChuyenMon={capNhatChuyenMon}
                  />
                );
              })}
            </div>
            <button
              className="button button-blue User-button"
              style={{ width: "max-content" }}
              onClick={themChuyenMon}
            >
              Thêm chuyên môn
            </button>
            <button
              className="button button-green User-button"
              onClick={luuChuyenMon}
            >
              Lưu thông tin
            </button>
          </div>
        </Tabs>

        <Tabs title={"Thông tin liên lạc"}>
          {danhSachThongTinLienLac.map((m) => (
            <Contact
              key={m.id}
              xoaThongTin={xoaThongTinLienLac}
              capNhatThongTin={capNhatThongTinLienLac}
              thongTin={m}
            />
          ))}

          <button
            className="button button-blue User-button"
            style={{ width: "max-content", margin: "20px 0px" }}
            onClick={themThongTinLienLac}
          >
            Thêm thông tin liên lạc
          </button>
          <button
            className="button button-green User-button"
            onClick={luuThongTinLienLac}
          >
            Lưu thông tin
          </button>
        </Tabs>
      </div>
    </>
  );
}

export default ContainTabs;
