import Header from "../Home/Header";
import "./css/Project.css";
import { useSelector } from "react-redux";
import { selectNguoiDung } from "./../../../store/nguoi-dung-slice";
import ProjectCard from "../../UI/ProjectCard";
import { useState } from "react";
import ModalBigAddProject from "../../UI/ModalBigAddProject";
import ModalBigUpdateProject from "../../UI/ModalBigUpdateProject";

function Project(props) {
  const nguoiDung = useSelector(selectNguoiDung);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [currentProject, setCurrentProject] = useState({});

  return (
    <>
      <Header />
      <div className="container Project-container">
        <div className="contain-features">
          <button
            className="button button-green"
            style={{ padding: "10px 20px" }}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Thêm dự án
          </button>
        </div>
        <div className="contain-project">
          {nguoiDung.duAns.map((d) => {
            return (
              <ProjectCard
                key={d.id}
                duAn={d}
                updateCurrentProject={() => setCurrentProject(d)}
                openModalUpdate={() => setOpenModalUpdate(true)}
              />
            );
          })}
        </div>
      </div>

      <ModalBigAddProject
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
      />

      <ModalBigUpdateProject
        isOpen={openModalUpdate}
        closeModal={() => setOpenModalUpdate(false)}
        duAn={currentProject}
      />
    </>
  );
}

export default Project;
