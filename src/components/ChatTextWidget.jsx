import { useState } from "react";
import "../css/ChatTextWidget.css"
import { useAppContext } from "../context/AppContext";

function ChatTextWidget({ addMessageFn }) {


    const { userId } = useAppContext();


    const handleSendMessage = async (e) => {
        e.preventDefault()
        console.log(messageText)
        addMessageFn({ "message": messageText, "datetime": new Date().toUTCString(), "senderId": userId, "sender": "You" })
        setMessageText("")
    }

    const [messageText, setMessageText] = useState("")
    return (
        <form className="chat-text-widget" onSubmit={handleSendMessage}>
            <input type="text" className="message-edit-area" name="message-edit-area" placeholder="Type your message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
            <button className="message-send-button" disabled={messageText.length === 0}>&#10148;</button>
        </form>
    )
}

export default ChatTextWidget;