import { useNavigate } from "react-router-dom"
import "../css/GroupCard.css"

function GroupCard({ group }) {

    const navigate = useNavigate();

    const navigateToGroup = (e) => {
        e.preventDefault();
        navigate(`/chat/${group.groupUUID}`, { state: { group } })
    }

    return (
        <div className="group-card" onClick={navigateToGroup}>
            <div className="group-poster">
                <img src="https://i.pinimg.com/736x/54/96/5d/54965dd687698faa2625109bb86b7687.jpg" alt={group.groupName} />
            </div>
            <div className="group-info">
                <h3>{group.groupName}</h3>
                <p>{group.createdDate}</p>
                <p>{group.description}</p>
            </div>
        </div>
    )
}


export default GroupCard;