import "./css/Card.css";
import { renderHtml } from "./../../utils/text-utils";
import { API_URL } from "./../../api/common-api";
import { avatar_nguoi_dung } from "./../../utils/image-utils";

function Card(props) {
  const { user } = props;
  return (
    <div className="Card" onClick={() => props.setCurrentUser(user)}>
      <div className="Card-img">
        <img src={API_URL + "/" + (user.avatar ?? avatar_nguoi_dung)} alt="" />
      </div>
      <div className="Card-info">
        <h3 className="Card-info-title">{user.tieuDeUngTuyen}</h3>
        <p className="Card-info-name">
          {user.ten} {user.ho}
        </p>
        <p className="Card-info-address">{user.thanhPho}</p>

        {/* <ul className="Card-info-reasons-work">
          <li className="Card-info-reason">Highly Skills and Technicals</li>
          <li className="Card-info-reason">
            Approach, research, and learn new Technology fast
          </li>
          <li className="Card-info-reason">
            Teamworks, Has highly responsible spirit
          </li>
        </ul> */}
        <div
          className="Card-info-reasons-work"
          dangerouslySetInnerHTML={renderHtml(user.lyDoLamViecVoiToi)}
        ></div>

        <ul className="Card-info-skills">
          {user.chuyenMons.map((m) => {
            return (
              <li key={m.id} className="Card-info-skill card-small">
                {m.tenChuyenMon}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Card;
