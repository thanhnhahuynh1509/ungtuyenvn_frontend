import Card from "../../UI/Card";
import BodyInfomation from "./BodyInfomation";
import "./css/Body.css";

function Body(props) {
  return (
    <section>
      <div className="container Body-container">
        <div className="Body-participants">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="Body-infomation">
          <BodyInfomation />
        </div>
      </div>
    </section>
  );
}

export default Body;
