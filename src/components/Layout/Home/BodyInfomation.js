import "./css/BodyInfomation.css";

function BodyInfomation(props) {
  return (
    <>
      <div className="Body-infomation-header">
        <h2 className="Body-infomation-title">Fresher Java Developer</h2>
        <p className="Body-infomation-name">
          <i className="fa-regular fa-user"></i> Huynh Thanh Nha
        </p>
        <p className="Body-infomation-city">
          <i className="fa-regular fa-compass"></i> Hồ Chí Minh
        </p>

        <div className="Body-infomation-features">
          <button className=" button Body-infomation-button button-primary">
            <i className="fa-solid fa-message"></i> Liên hệ
          </button>
          <button className="button">
            <i className="fa-regular fa-thumbs-up"></i>
          </button>
        </div>
        <div className="seperate"></div>
      </div>

      <ul className="Body-infomation-skills">
        <li className="card-small">Java</li>
        <li className="card-small">Spring</li>
        <li className="card-small">Javascript</li>
        <li className="card-small">React JS</li>
        <li className="card-small">SQL</li>
        <li className="card-small">Docker</li>
        <li className="card-small">Linux</li>
        <li className="card-small">English</li>
      </ul>

      <div className="seperate"></div>

      <div className="section-content">
        <h3 className="section-content-title">3 Lý Do Để Làm Việc Với Tôi</h3>
        <ul className="reasons">
          <li className="reason text-bold">Highly Skills and Technicals</li>
          <li className="reason text-bold">
            Approach, research, and learn new Technology fast
          </li>
          <li className="reason text-bold">
            Teamworks, Has highly responsible spirit
          </li>
        </ul>
      </div>

      <div className="section-content">
        <h3 className="section-content-title">Giới thiệu về bản thân</h3>
        <ul className="reasons">
          <li className="">
            Graduated at Hutech University with 3.65/4 scores{" "}
          </li>
          <li className="">
            Has a deep and wide knowledge about Java, Spring,...
          </li>
          <li className="">
            I've finished the internship program at Dirox Company{" "}
          </li>
        </ul>
      </div>

      <div className="section-content">
        <h3 className="section-content-title">Kinh nghiệm làm việc</h3>
        <ul className="reasons">
          <li className="">
            Graduated at Hutech University with 3.65/4 scores{" "}
          </li>
          <li className="">
            Has a deep and wide knowledge about Java, Spring,...
          </li>
          <li className="">
            I've finished the internship program at Dirox Company{" "}
          </li>
        </ul>
      </div>

      <div className="section-content">
        <h3 className="section-content-title">Kỹ năng hiện có</h3>
        <ul className="reasons">
          <li className="">
            Graduated at Hutech University with 3.65/4 scores{" "}
          </li>
          <li className="">
            Has a deep and wide knowledge about Java, Spring,...
          </li>
          <li className="">
            I've finished the internship program at Dirox Company{" "}
          </li>
        </ul>
      </div>

      <div className="section-footer">
        <button className="button button-primary">Xem thêm</button>
      </div>
    </>
  );
}

export default BodyInfomation;
