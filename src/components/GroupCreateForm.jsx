import { useState } from "react";
import "../css/GroupCreateForm.css"
import { createNewGroup } from "../services/api";
import { useAppContext } from "../context/AppContext";

function GroupCreateForm({ onClose }) {

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const { token, setGroups } = useAppContext();

    const handleCreateNewGroup = async (e) => {
        e.preventDefault();
        try {
            const response = await createNewGroup({ token: token, groupName: groupName, groupDescription: groupDescription });
            console.log("Successfully created new group")
            console.log(response);
            setGroups(prevGroups => [...prevGroups, response["group"]]);
        } catch (e) {
            onClose();
            console.log("Error while creating new group" + e);
            alert("Error while creating new group");
        }
        onClose();
    }

    return (
        <form className="group-form" onSubmit={handleCreateNewGroup}>
            <input placeholder="Group name" className="group-input" type="text" maxLength="50" required onChange={(e) => setGroupName(e.target.value)} value={groupName} />
            <input placeholder="Description" className="group-input" type="text" maxLength="200" required onChange={(e) => setGroupDescription(e.target.value)} value={groupDescription} />
            <input type="submit" value="Create" />
        </form>
    )
}

export default GroupCreateForm;