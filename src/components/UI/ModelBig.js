import "./css/ModalBig.css";

function ModalBig(props) {
  return (
    <>
      <div className={`Modal ${props.open && "show"}`}>
        <div className="backdrop" onClick={props.onClose}></div>
        <div className="Modal-content-big">{props.children}</div>
      </div>
    </>
  );
}

export default ModalBig;
