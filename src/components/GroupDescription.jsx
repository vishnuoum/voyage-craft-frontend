import "../css/GroupDescription.css";

function GroupDescription({ text }) {
    return (
        <div className="group-description">
            <p>Group Description</p>
            {text}
        </div>
    )
}


export default GroupDescription;