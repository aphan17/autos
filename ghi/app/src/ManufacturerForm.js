import {useState} from 'react';

function ManufacturerForm() {
    const [name, setName] = useState('');
    const [createSuccess, setCreateSuccess] = useState(false);

    async function handleSumbit(event) {
        event.preventDefault();
        const data = {
            name,
        };

        const manufacturerURL = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturerURL, fetchConfig);
        if (response.ok) {
            setName('');
            setCreateSuccess(true);
        }
    }

    function handleNameChange(event) {
        const {value} = event.target;
        setName(value);
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (createSuccess) {
        messageClasses = "alert alert-success mb-0";
        formClasses = "d-none";
    }

    return (
        <div className="shadow p-4 mt-4">
            <h1>Create a new manufacturer</h1>
            <form onSubmit={handleSumbit} className={formClasses} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                    <input className="form-control" value={name} onChange={handleNameChange} placeholder='Name' type='text' name='name' id='name'/>
                    <label htmlFor='name'>Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Success! Manufacturer created!
            </div>
        </div>

    )
}

export default ManufacturerForm;
