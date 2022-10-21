import "./css/ContainInfo.css";

function ContainInfo(props) {
  return (
    <>
      <div className="contain-icon-info">
        <i
          style={{ color: "#333", fontSize: "20px" }}
          className="fa-solid fa-circle-info icon-info"
        ></i>
        <div className="content-info">{props.content}</div>
      </div>
    </>
  );
}

export default ContainInfo;
