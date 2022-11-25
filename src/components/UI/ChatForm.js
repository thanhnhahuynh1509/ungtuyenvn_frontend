import { API_URL } from "../../api/common-api";
import { avatar_nguoi_dung } from "../../utils/image-utils";
import { useDispatch, useSelector } from "react-redux";
import { deleteChatUI } from "../../store/chat-ui-slice";
import "./css/ChatForm.css";
import { useEffect, useRef, useState } from "react";
import { selectNguoiDung } from "../../store/nguoi-dung-slice";
import { selectStomp } from "../../store/stomp-slice";
import { layChatTuChatUser } from "../../api/chat-user-api";
import { selectHasNewChat } from "../../store/chat-user-slice";
import { format } from "date-fns";

function ChatForm(props) {
  const { model } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const currentUser = useSelector(selectNguoiDung);
  const stomp = useSelector(selectStomp);
  const [chatsContent, setChatsContent] = useState([]);
  const hasNewChat = useSelector(selectHasNewChat);
  const [trigger, setTrigger] = useState({});

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const init = async () => {
      const response = await layChatTuChatUser(model.id);
      const array = [];
      for (let chat of response) {
        array.unshift(chat);
      }
      setChatsContent(array);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    };

    init();
  }, [hasNewChat]);

  useEffect(() => {
    scrollToBottom();
  }, [trigger]);

  const removeChatForm = (id) => {
    dispatch(deleteChatUI(id));
  };

  const handleChat = () => {
    if (value.length > 0) {
      const toId = currentUser.id === model.to.id ? model.from.id : model.to.id;
      const message = value;
      stomp.send(
        "/app/chat/" + currentUser.id + "/" + toId + "/" + model.id,
        {},
        message
      );
      setValue("");
      setChatsContent([
        ...chatsContent,
        {
          content: message,
          date: format(new Date(), "dd/MM/yyyy HH:mm"),
          owner: { id: currentUser.id },
        },
      ]);
      setTrigger({ ...trigger });
    }
  };

  return (
    <div className="ChatForm">
      <div className="ChatForm-header">
        <div className="header-information">
          <img
            src={API_URL + "/" + (model.to.avatar ?? avatar_nguoi_dung)}
            alt=""
          />
          <p>
            {model.to.ho} {model.to.ten}
          </p>
        </div>
        <div className="header-features">
          <button
            className="button button-red"
            onClick={() => removeChatForm(model.id)}
          >
            X
          </button>
        </div>
      </div>
      <div className="ChatForm-content">
        {chatsContent.map((c, index) => {
          return (
            <div
              key={index}
              className={`ChatContent ${
                c.owner.id === currentUser.id && "owner"
              }`}
            >
              <p className="ChatContent-content">{c.content}</p>
              <p className="ChatContent-date">{c.date}</p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="ChatForm-form">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => console.log("on focus")}
        />
        <button className="button button-green" onClick={handleChat}>
          Gửi
        </button>
      </div>
    </div>
  );
}

export default ChatForm;
