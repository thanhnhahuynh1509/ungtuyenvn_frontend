import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import BodyInfomation from "./BodyInfomation";
import "./css/Body.css";
import { layTatCaNguoiDung } from "./../../../api/nguoi-dung-api";

function Body(props) {
  const [nguoiDungs, setNguoiDungs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      setNguoiDungs(await layTatCaNguoiDung());
    };

    init();
  }, []);

  return (
    <section>
      <div className="container Body-container">
        <div className="Body-participants">
          {nguoiDungs.map((m) => {
            return <Card user={m} key={m.id} setCurrentUser={setCurrentUser} />;
          })}
        </div>
        <BodyInfomation user={currentUser} />
      </div>
    </section>
  );
}

export default Body;
