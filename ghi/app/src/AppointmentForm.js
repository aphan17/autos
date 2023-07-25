import {useState, useEffect } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [technician, setTechnician] = useState('');
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [reason, setReason] = useState('');
    const [createSuccess, setCreateSuccess] = useState(false);


    async function getTechnicians() {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const technicians = data.technicians;
            setTechnicians(technicians);
        }
    }
    useEffect(() => {
        getTechnicians();
    }, [])


    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            vin,
            customer,
            reason,
            date_time: dateTime,
            technician,
        };
        console.log(data.technician);
        console.log(data);

        const appointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        console.log(response);
        if (response.ok) {
            setVin('');
            setCustomer('');
            setDateTime('');
            setReason('');
            setTechnician('');
            setCreateSuccess(true);
        }
    }


    function handleVinChange(event) {
        const {value} = event.target;
        setVin(value);
    }

    function handleCustomerChange(event) {
        const {value} = event.target;
        setCustomer(value);
    }

    function handleReasonChange(event) {
        const {value} = event.target;
        setReason(value);
    }

    function handleDateTimeChange(event) {
        const {value} = event.target;
        setDateTime(value);
    }

    function handleTechnicianChange(event) {
        const {value} = event.target;
        setTechnician(value);
    }


    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (createSuccess) {
        messageClasses = "alert alert-success mb-0";
        formClasses = "d-none";
    }


    return (
        <div className="shadow p-4 mt-4">
            <h1>Create a Service Appointment</h1>
            <form onSubmit={handleSubmit} className={formClasses}>
                <div className="form-floating mb-3">
                    <input required className="form-control" value={vin} onChange={handleVinChange} type="text" name="vin" id="vin"/>
                    <label htmlFor="vin">Automobile Vin</label>
                </div>
                <div className="form-floating mb-3">
                    <input required className="form-control" value={dateTime} onChange={handleDateTimeChange} type="datetime-local" name="date_time" id="date_time"/>
                    <label htmlFor="date_time">Choose Time for Appointment</label>
                </div>
                <div className="form-floating mb-3">
                    <input required className="form-control" value={customer} onChange={handleCustomerChange} type="text" name="customer" id="customer"/>
                    <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                    <input required className="form-control" value={reason} onChange={handleReasonChange} type="text" name="reason" id="reason"/>
                    <label htmlFor="reason">Reason</label>
                </div>
                <div className="mb-3">
                    <select required value={technician} onChange={handleTechnicianChange} name="technican" id="technician" className="form-select">
                    <option value="">Choose a technican</option>
                    {technicians.map(technician => {
                        return (
                        <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                        )
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Success! Appointment created!
            </div>
        </div>
    )


}

export default AppointmentForm;
