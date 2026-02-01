import "../css/Fab.css"

function Fab({ openModal }) {
    return (
        <button className="fab" onClick={openModal}>Plan New Trip</button>
    )
}

export default Fab;