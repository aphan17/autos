import {useState} from 'react';

function ManufacturerForm() {
    const [name, setName] = useState('');

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
        }
    }

    function handleNameChange(event) {
        const {value} = event.target;
        setName(value);
    }

    return (
        <div className="shadow p-4 mt-4">
            <h1>Create a new manufacturer</h1>
            <form onSubmit={handleSumbit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                    <input className="form-control" value={name} onChange={handleNameChange} placeholder='Name' type='text' name='name' id='name'/>
                    <label htmlFor='name'>Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>

    )
}

export default ManufacturerForm;
