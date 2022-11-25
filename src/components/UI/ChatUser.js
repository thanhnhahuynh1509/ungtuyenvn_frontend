import { useEffect, useState } from "react";
import { layChatUser } from "../../api/chat-user-api";
import { layNguoiDungVaCapNhatToken } from "../../api/common-api";
import Chat from "./Chat";
import "./css/ChatUser.css";
import { useDispatch, useSelector } from "react-redux";
import {
  initChatUser,
  selectChatUser,
  selectHasNewChat,
} from "./../../store/chat-user-slice";
import { selectNguoiDung } from "../../store/nguoi-dung-slice";

function ChatUser(props) {
  const chatUsers = useSelector(selectChatUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const user = await layNguoiDungVaCapNhatToken(
        localStorage.getItem("jwt-token")
      );
      const response = await layChatUser(user.id);
      dispatch(initChatUser(response));
    };

    init();
  }, []);

  return (
    <>
      <div className="ChatUser" style={props.style}>
        <h2 className="ChatUser-title">Chat</h2>
        <div className="ChatUser-search">
          <input type="text" />
        </div>
        <div className="ChatUser-contains-chats">
          {chatUsers.map((c) => {
            return <Chat key={c.id} model={c} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ChatUser;
