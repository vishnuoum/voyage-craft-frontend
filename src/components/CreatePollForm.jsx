import { useState } from "react";
import "../css/CreatePollForm.css"

function CreatePollForm({ onClose }) {

    const [options, setOptions] = useState([""]);

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const handleChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(options);
        onClose();
    };

    const removeOption = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    }

    return (
        <form onSubmit={handleSubmit} className="option-form">
            {options.map((value, index) => (
                <div key={index} className="option-group">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        placeholder="Enter Option"
                        className="option-input"
                    />
                    <button className="option-close" type="button" onClick={(e) => removeOption(e, index)}>
                        ✕
                    </button>
                </div>
            ))}

            <button type="button" onClick={addOption} className="add-option-button">
                + Add Option
            </button>

            <button type="submit" disabled={options.length == 0} className="submit-option-form">Submit</button>
        </form>
    );
}

export default CreatePollForm;