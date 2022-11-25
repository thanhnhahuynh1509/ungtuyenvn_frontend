import { avatar_nguoi_dung } from "../../utils/image-utils";
import "./css/Chat.css";
import { API_URL } from "./../../api/common-api";
import { useEffect, useState } from "react";
import { layChatTuChatUser } from "./../../api/chat-user-api";
import { useDispatch, useSelector } from "react-redux";
import { addChatUI } from "../../store/chat-ui-slice";
import { selectNguoiDung } from "../../store/nguoi-dung-slice";
import { selectHasNewChat } from "../../store/chat-user-slice";

function Chat(props) {
  const [model, setModel] = useState(props.model);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectNguoiDung);
  const hasNewChat = useSelector(selectHasNewChat);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const init = async () => {
      const response = await layChatTuChatUser(model.id);
      setChats(response);
    };

    init();

    if (model.to.id == currentUser.id) {
      setModel({ ...model, to: model.owner, owner: model.to });
    }
  }, [hasNewChat]);

  const handleClick = () => {
    dispatch(addChatUI(model));
  };

  return (
    <div className="Chat" onClick={handleClick}>
      <div className="Chat-avatar">
        <img
          src={API_URL + "/" + (model.to.avatar ?? avatar_nguoi_dung)}
          alt=""
        />
      </div>
      <div className="Chat-content">
        <div className="Chat-content-name">
          {model.to.ho} {model.to.ten}
        </div>
        <div className="Chat-content-content">
          {chats.length > 0 && (
            <>
              <p className="content-message">{chats[0].content}</p>
              <p className="content-date">{chats[0].date}</p>
            </>
          )}

          {chats.length <= 0 && (
            <>
              <p className="content-message">...</p>
              <p className="content-date">...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
