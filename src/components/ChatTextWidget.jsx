import { useState } from "react";
import "../css/ChatTextWidget.css"
import { useAppContext } from "../context/AppContext";

function ChatTextWidget({ addMessageFn, pollButtonAction }) {


    const { userId } = useAppContext();


    const handleSendMessage = async (e) => {
        e.preventDefault()
        console.log(messageText)
        addMessageFn({ "message": messageText, "datetime": new Date().toUTCString(), "senderId": userId, "sender": "You", "type": "CHAT" })
        setMessageText("")
    }

    const displayPollModal = (e) => {
        e.preventDefault();
        pollButtonAction();
    }

    const [messageText, setMessageText] = useState("")
    return (
        <form className="chat-text-widget" onSubmit={handleSendMessage}>
            <button className="create-poll-button" onClick={displayPollModal}>&#128202;</button>
            <input type="text" className="message-edit-area" name="message-edit-area" placeholder="Type your message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
            <button className="message-send-button" disabled={messageText.length === 0} type="submit">&#10148;</button>
        </form>
    )
}

export default ChatTextWidget;