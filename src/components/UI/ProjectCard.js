import "./css/ProjectCard.css";
import ModalBig from "./ModelBig";
import { API_URL } from "./../../api/common-api";
import { project_image } from "../../utils/image-utils";
import { renderHtml } from "./../../utils/text-utils";

function ProjectCard(props) {
  const { duAn } = props;

  const xuLyXemThem = () => {
    if (props.openModalUpdate) props.openModalUpdate();
    if (props.updateCurrentProject) props.updateCurrentProject();
  };

  return (
    <>
      <div className="Project-card">
        <img
          src={API_URL + "/" + (duAn.hinhAnh ?? project_image)}
          alt=""
          className="Project-img"
        />
        <div className="Project-card-content">
          <h3 className="Project-title">{duAn.tenDuAn}</h3>
          <div
            className="Project-desc"
            dangerouslySetInnerHTML={renderHtml(duAn.moTa)}
          ></div>
          <button
            className="button button-blue"
            style={{ padding: "10px" }}
            onClick={() => {
              xuLyXemThem();
              props.onAddClick();
            }}
          >
            Xem thêm
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
