import { useEffect, useState } from "react";
import { fetchJoinedGroup } from "../services/api";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import "../css/Home.css"
import GroupCard from "../components/GroupCard";
import Fab from "../components/Fab";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import GroupCreateForm from "../components/GroupCreateForm";

function Home() {

    const { token, groups, setGroups } = useAppContext();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setGroups([])
                setError(null);
                setLoading(true);
                const result = await fetchJoinedGroup({ token: token });
                if (result.status === 401 || result.status === 403) {
                    navigate("/login", { replace: true });
                }
                const joinedGroups = await result.json();
                console.log("Fetching joined groups completed");
                console.log(joinedGroups);
                setGroups(joinedGroups.groups);
            } catch (e) {
                setError("Error loading the groups.........")
                console.log("Error fetching the joined groups");
            } finally {
                setLoading(false);
            }
        }
        fetchGroups();
    }, [])

    return (
        loading ? <Loading /> :
            <>
                <div className="home">
                    <Navbar title="Voyage-Craft" />
                    {error && <div className="error-message">{error}</div>}

                    {groups.length === 0 ? <div className="no-group">No groups to display</div> :
                        <div className="group-grid">
                            {groups.map(group => (
                                <GroupCard group={group} key={group.id} />
                            ))}
                        </div>}

                </div>
                <Fab openModal={() => setOpen(true)} />
                <Modal
                    open={open}
                    title="Create Group"
                    onClose={() => setOpen(false)}
                >
                    <GroupCreateForm onClose={() => setOpen(false)} />
                </Modal>
            </>
    )
}

export default Home;