import { useDispatch, useSelector } from "react-redux";
import "./css/Modal.css";
import { selectModal, updateModal } from "./../../store/modal-slice";

function Modal(props) {
  const modalState = useSelector(selectModal);
  const dispatch = useDispatch();

  const handleCancel = () => {
    modalState.handleCancel();
    dispatch(updateModal({ ...modalState, hide: true }));
  };

  const handleAccept = () => {
    modalState.handleAccept();
    dispatch(updateModal({ ...modalState, hide: true }));
  };

  return (
    <>
      <div className={`Modal ${!modalState.hide && "show"}`}>
        <div className="backdrop"></div>
        <div className="Modal-container">
          <div className="Modal-content">
            <div className="Modal-head">
              <p className="Modal-icon">{modalState.icon}</p>
              <h3>{modalState.title}</h3>
            </div>

            <div className="Modal-body">
              <p>{modalState.message}</p>
            </div>

            <div className="seperate"></div>

            <div className="Modal-footer">
              <div className="Modal-contain-buttons">
                <button className="button button-black" onClick={handleCancel}>
                  Hủy
                </button>
                <button className="button button-green" onClick={handleAccept}>
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
