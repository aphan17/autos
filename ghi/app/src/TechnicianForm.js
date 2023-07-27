import {useState} from 'react';

function TechnicianForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [createSuccess, setCreateSuccess] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            employee_id: employeeId,
        };

        const technicianURL = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(technicianURL, fetchConfig);
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
            setCreateSuccess(true);
        }
    }


    function handleFirstNameChange(event) {
        const {value} = event.target;
        setFirstName(value);
    }

    function handleLastNameChange(event) {
        const {value} = event.target;
        setLastName(value);
    }

    function handleEmployeeIdChange(event) {
        const {value} = event.target;
        setEmployeeId(value);
    }


    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (createSuccess) {
        messageClasses = "alert alert-success mb-0";
        formClasses = "d-none";
    }


    return (
        <div className="shadow p-4 mt-4">
            <h1>Add a Technician</h1>
            <form onSubmit={handleSubmit} className={formClasses} id="create-technician-form">
                <div className="form-floating mb-3">
                    <input className="form-control" value={firstName} onChange={handleFirstNameChange} placeholder="First Name" type="text" name="first_name" id="first_name"/>
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" value={lastName} onChange={handleLastNameChange} placeholder="Last Name" type="text" name="last_name" id="last_name"/>
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" value={employeeId} onChange={handleEmployeeIdChange} placeholder="Employee ID" type="text" name="employee_id" id="employee_id"/>
                    <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Success! Technician created!
            </div>
        </div>
    )
}

export default TechnicianForm;
