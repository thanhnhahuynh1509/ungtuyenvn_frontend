import "./css/ContainChatForm.css";
import ChatForm from "./ChatForm";
import { useSelector } from "react-redux";
import { selectChatUI } from "./../../store/chat-ui-slice";

function ContainChatForm(props) {
  const chatUI = useSelector(selectChatUI);
  return (
    <div className="Contain-chats-form">
      <div className="Contain-chats">
        {chatUI.map((c) => {
          return <ChatForm key={c.id} model={c} />;
        })}
      </div>
    </div>
  );
}

export default ContainChatForm;
