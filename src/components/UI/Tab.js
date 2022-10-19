import "./css/Tabs.css";

function Tabs(props) {
  return (
    <>
      <div className="Tabs">
        <div className="Tabs-title">
          <h3>{props.title}</h3>
        </div>
        <div className="Tabs-content">{props.children}</div>
      </div>
    </>
  );
}

export default Tabs;
