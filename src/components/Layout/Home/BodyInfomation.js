import "./css/BodyInfomation.css";
import { renderHtml } from "./../../../utils/text-utils";
import ModalBig from "../../UI/ModelBig";
import { useState } from "react";
import { API_URL } from "./../../../api/common-api";
import { avatar_nguoi_dung, project_image } from "./../../../utils/image-utils";
import ProjectCard from "./../../UI/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { selectNguoiDung } from "./../../../store/nguoi-dung-slice";
import { selectStomp } from "../../../store/stomp-slice";
import ReportModal from "../../UI/ReportModal";
import { updateModal } from "../../../store/modal-slice";

function BodyInfomation(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalProject, setOpenModalProject] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [openReport, setOpenReport] = useState(false);
  const dispatch = useDispatch();
  const { user } = props;

  const modal = {
    title: "Bạn đã chiêu mộ người dùng",
    message: "Chiêu mộ thành công và đợi người dùng trả lời bạn qua email!",
    icon: (
      <i style={{ color: "green" }} className="fa-regular fa-circle-check"></i>
    ),
    hide: false,
    handleAccept: () => {},
    handleCancel: () => {},
  };

  const nguoiDung = useSelector(selectNguoiDung);
  const stomp = useSelector(selectStomp);

  const handleChieuMo = () => {
    if (!nguoiDung) {
      window.location.href = "/sign_in";
    } else {
      stomp.send("/app/" + nguoiDung.id + "/" + user.id);
      dispatch(updateModal(modal));
    }
  };
  return (
    <>
      {user && (
        <>
          <div className="Body-infomation">
            <div className="Body-infomation-header">
              <h2 className="Body-infomation-title">{user.tieuDeUngTuyen}</h2>
              <p className="Body-infomation-name">
                <i className="fa-regular fa-user"></i> {user.ten} {user.ho}
              </p>
              <p className="Body-infomation-city">
                <i className="fa-regular fa-compass"></i> {user.thanhPho}
              </p>
              {(!nguoiDung || nguoiDung.id !== user.id) && (
                <div className="Body-infomation-features">
                  <button
                    className=" button Body-infomation-button button-primary"
                    onClick={handleChieuMo}
                  >
                    <i className="fa-regular fa-bell"></i> Chiêu mộ
                  </button>
                  <button
                    className="button"
                    onClick={() => setOpenReport(true)}
                  >
                    <i className="fa-regular fa-flag"></i>
                  </button>
                </div>
              )}
              {user.cv && (
                <>
                  <div className="seperate"></div>

                  <a
                    style={{ margin: "10px 0px", display: "inline-block" }}
                    href={API_URL + "/" + user.cv}
                    download
                    target={"_blank"}
                  >
                    CV của tôi
                  </a>
                </>
              )}
              <div className="seperate"></div>
            </div>

            <ul className="Body-infomation-skills">
              {user.chuyenMons.map((m) => {
                return (
                  <li key={m.id} className="card-small">
                    {m.tenChuyenMon}
                  </li>
                );
              })}
            </ul>

            <div className="seperate"></div>

            {/* Ly Do Lam Viec */}
            {user.lyDoLamViecVoiToi && (
              <div className="section-content">
                <h3 className="section-content-title">
                  3 Lý Do Để Làm Việc Với Tôi
                </h3>
                <div
                  className="reasons"
                  dangerouslySetInnerHTML={renderHtml(user.lyDoLamViecVoiToi)}
                ></div>
              </div>
            )}

            {/* Gioi thieu */}
            {user.moTa && (
              <div className="section-content">
                <h3 className="section-content-title">
                  Giới thiệu về bản thân
                </h3>
                <div
                  className="reasons"
                  dangerouslySetInnerHTML={renderHtml(user.moTa)}
                ></div>
              </div>
            )}

            {/* Kinh nghiem lam viec */}
            {user.hoSoLamviecs > 0 && (
              <div className="section-content">
                <h3 className="section-content-title">Kinh nghiệm làm việc</h3>

                <ul className="reasons">
                  {user.hoSoLamViecs.map((h) => {
                    return (
                      <li key={h.id}>
                        <h4>{h.tenCongViec}</h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#333",
                            marginBottom: "15px",
                          }}
                        >
                          {h.ngayBatDau}{" "}
                          <i
                            style={{ color: "#ccc" }}
                            className="fa-solid fa-caret-right"
                          ></i>{" "}
                          {h.ngayKetThuc}
                        </p>
                        <p
                          style={{ fontSize: "15px", color: "#333" }}
                          dangerouslySetInnerHTML={renderHtml(h.moTa)}
                        ></p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Ky Nang */}
            {user.kyNangLamViecs && (
              <div className="section-content">
                <h3 className="section-content-title">Kỹ năng hiện có</h3>
                <ul className="reasons">
                  {user.kyNangLamViecs.map((k) => {
                    return (
                      <li key={k.id}>
                        <h4>{k.tenKyNang}</h4>
                        <p
                          style={{ fontSize: "15px", color: "#333" }}
                          dangerouslySetInnerHTML={renderHtml(k.moTa)}
                        ></p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Thong tin */}
            {user.thongTinLienLacs && (
              <div className="section-content">
                <h3 className="section-content-title">Thông tin liên lạc</h3>
                <ul className="reasons">
                  {user.thongTinLienLacs.map((k) => {
                    return (
                      <li key={k.id}>
                        {k.tenThongTin}: {k.giaTriThongTin}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="section-footer">
              <button
                className="button button-primary"
                onClick={() => setOpenModal(true)}
              >
                Xem thêm
              </button>
            </div>
          </div>
        </>
      )}

      {!user && (
        <div
          className="Body-infomation"
          style={{
            backgroundColor: "#ececec",
            height: "100%",
            border: "1px solid #ccc",
          }}
        ></div>
      )}

      <ModalBig open={openModal} onClose={() => setOpenModal(false)}>
        {user && (
          <>
            <div className="Body-infomation">
              <div className="">
                <img
                  src={API_URL + "/" + (user.avatar ?? avatar_nguoi_dung)}
                  alt=""
                  style={{ width: "200px" }}
                />
                <h2 className="Body-infomation-title">{user.tieuDeUngTuyen}</h2>
                <p className="Body-infomation-name">
                  <i className="fa-regular fa-user"></i> {user.ten} {user.ho}
                </p>
                <p className="Body-infomation-city">
                  <i className="fa-regular fa-compass"></i> {user.thanhPho}
                </p>

                {(!nguoiDung || nguoiDung.id !== user.id) && (
                  <div className="Body-infomation-features">
                    <button
                      className=" button Body-infomation-button button-primary"
                      onClick={handleChieuMo}
                    >
                      <i className="fa-regular fa-bell"></i> Chiêu mộ
                    </button>
                    <button
                      className="button"
                      onClick={() => setOpenReport(true)}
                    >
                      <i className="fa-regular fa-flag"></i>
                    </button>
                  </div>
                )}
                <div className="seperate"></div>
              </div>

              <ul className="Body-infomation-skills">
                {user.chuyenMons.map((m) => {
                  return (
                    <li key={m.id} className="card-small">
                      {m.tenChuyenMon}
                    </li>
                  );
                })}
              </ul>

              {user.cv && (
                <>
                  <div className="seperate"></div>

                  <a
                    style={{ margin: "10px 0px", display: "inline-block" }}
                    href={API_URL + "/" + user.cv}
                    download
                    target={"_blank"}
                  >
                    CV của tôi
                  </a>
                </>
              )}

              <div className="seperate"></div>

              {/* Ly Do Lam Viec */}
              {user.lyDoLamViecVoiToi && (
                <div className="section-content">
                  <h3 className="section-content-title">
                    3 Lý Do Để Làm Việc Với Tôi
                  </h3>
                  <div
                    className="reasons"
                    dangerouslySetInnerHTML={renderHtml(user.lyDoLamViecVoiToi)}
                  ></div>
                </div>
              )}

              {/* Gioi thieu */}
              {user.moTa && (
                <div className="section-content">
                  <h3 className="section-content-title">
                    Giới thiệu về bản thân
                  </h3>
                  <div
                    className="reasons"
                    dangerouslySetInnerHTML={renderHtml(user.moTa)}
                  ></div>
                </div>
              )}

              {/* Kinh nghiem lam viec */}
              {user.hoSoLamviecs > 0 && (
                <div className="section-content">
                  <h3 className="section-content-title">
                    Kinh nghiệm làm việc
                  </h3>

                  <ul className="reasons">
                    {user.hoSoLamViecs.map((h) => {
                      return (
                        <li key={h.id}>
                          <h4>{h.tenCongViec}</h4>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#333",
                              marginBottom: "15px",
                            }}
                          >
                            {h.ngayBatDau}{" "}
                            <i
                              style={{ color: "#ccc" }}
                              className="fa-solid fa-caret-right"
                            ></i>{" "}
                            {h.ngayKetThuc}
                          </p>
                          <p
                            style={{ fontSize: "15px", color: "#333" }}
                            dangerouslySetInnerHTML={renderHtml(h.moTa)}
                          ></p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Ky Nang */}
              {user.kyNangLamViecs && (
                <div className="section-content">
                  <h3 className="section-content-title">Kỹ năng hiện có</h3>
                  <ul className="reasons">
                    {user.kyNangLamViecs.map((k) => {
                      return (
                        <li key={k.id}>
                          <h4>{k.tenKyNang}</h4>
                          <p
                            style={{ fontSize: "15px", color: "#333" }}
                            dangerouslySetInnerHTML={renderHtml(k.moTa)}
                          ></p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Thong tin */}
              {user.thongTinLienLacs && (
                <div className="section-content">
                  <h3 className="section-content-title">Thông tin liên lạc</h3>
                  <ul className="reasons">
                    {user.thongTinLienLacs.map((k) => {
                      return (
                        <li key={k.id}>
                          {k.tenThongTin}: {k.giaTriThongTin}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Du An */}
              {user.thongTinLienLacs && (
                <div className="section-content">
                  <h3 className="section-content-title">Dự Án</h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "20px",
                    }}
                  >
                    {user.duAns.map((d) => {
                      return (
                        <ProjectCard
                          key={d.id}
                          duAn={d}
                          onAddClick={() => {
                            setCurrentProject(d);
                            setOpenModalProject(true);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </ModalBig>

      <ModalBig
        open={openModalProject}
        onClose={() => setOpenModalProject(false)}
      >
        {currentProject && (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <p>
                <strong>Tên dự án:</strong> {currentProject.tenDuAn}
              </p>
              <div>
                <strong>Mô tả:</strong>
                <p
                  dangerouslySetInnerHTML={renderHtml(currentProject.moTa)}
                ></p>
              </div>
              <div>
                <h4>Hình ảnh dự án:</h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "20px",
                    alignItems: "center",
                    margin: "20px 0px",
                  }}
                >
                  <img
                    src={
                      API_URL + "/" + (currentProject.hinhAnh ?? project_image)
                    }
                    alt=""
                    style={{
                      objectFit: "contain",
                    }}
                  />

                  {currentProject.hinhAnhDuAns.map((m) => {
                    return (
                      <img key={m.id} src={API_URL + "/" + m.lienKet} alt="" />
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </ModalBig>

      {user && (
        <ReportModal
          userId={user.id}
          open={openReport}
          setOpen={setOpenReport}
        />
      )}
    </>
  );
}

export default BodyInfomation;
