import "../css/ChatBubble.css"

function ChatBubble({ message, userId }) {
    console.log(message)
    const istString = new Date(message.datetime).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        // Optional: specify desired output format options
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // Use 12-hour format with AM/PM
    });
    return (
        <div className={`chat-bubble ${message.senderId === userId ? "right" : "left"}`}>
            {message.sender !== "You" && <p className="sender">{message.sender}</p>}
            {message.message}
            <p className="time">{istString}</p>
        </div>
    )
}

export default ChatBubble