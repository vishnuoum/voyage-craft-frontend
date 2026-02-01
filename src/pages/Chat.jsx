import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/Chat.css"
import ChatTextWidget from "../components/ChatTextWidget";
import GroupDescription from "../components/GroupDescription";
import ChatBubble from "../components/ChatBubble";
import {
    connectGroupSocket,
    sendGroupMessage,
    disconnectSocket
} from "../services/socket";
import { useAppContext } from "../context/AppContext";

function Chat() {
    const { groupId } = useParams();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const { group } = location.state || {};
    const { userId, token } = useAppContext();


    const addSelfMessage = (message) => {
        setMessages(prev => [message, ...prev]);
    }

    const addMessage = (message) => {
        if (message.senderId == userId) return
        setMessages(prev => [message, ...prev]);
    }

    const sendMessage = (message) => {
        console.log("add message", message);
        addSelfMessage(message);
        sendGroupMessage({ "senderId": userId, "groupUUID": groupId, "message": message.message, "messageType": "CHAT" }, token)
    }

    useEffect(() => {
        connectGroupSocket(groupId, addMessage);

        return () => {
            disconnectSocket();
        };
    }, [groupId]);

    console.log(group)

    return (
        <div className="chat-container">
            <Navbar title={group.groupName} />
            <div className="chat-window">
                {messages.map(message => (
                    <ChatBubble message={message} userId={userId} />
                ))}
                <GroupDescription text={group.description} />
            </div>
            <ChatTextWidget addMessageFn={sendMessage} />
        </div>
    );
}

export default Chat;