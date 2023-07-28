import {useState, useEffect } from 'react';

function ServiceHistory(){
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);
    const [search, setSearch] = useState('');


    async function getAppointments() {
        const response = await fetch("http://localhost:8080/api/appointments/");
        if (response.ok) {
            const data = await response.json();
            const appointments = data.appointments;
            setAppointments(appointments);
        } else {
            console.error("An error occured fetching the data")
        }
    }
    useEffect(() => {
        getAppointments();
    }, [])


    async function getAutomobiles() {
        const response = await fetch("http://localhost:8080/api/automobiles/");
        if (response.ok) {
            const data = await response.json();
            const automobiles = data.automobiles;
            setAutomobiles(automobiles);
        } else {
            console.error("An error occured fetching the data")
        }
    }
    useEffect(() => {
        getAutomobiles();
    }, [])

    function getVipStatus(appointmentVin) {
        const matchVin = automobiles.find(automobile => automobile.vin === appointmentVin)
        let vipStatus;
        if (matchVin) {
            vipStatus = "Yes";
        } else {
            vipStatus = "No";
        }
        return vipStatus;
    }

    function handleSearchChange(event) {
        const {value} = event.target;
        setSearch(value)
    }

    function handleSumbit(event) {
        event.preventDefault();
    }


    return (
        <div className="p-4 mt-4">
            <h1>Service History</h1>
            <form onSubmit={handleSumbit}>
                <div id="form-outline">
                    <input onChange={handleSearchChange} value={search} type="search" className='form-control' placeholder='Search by Vin..'/>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Vip?</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.filter(appointment => {
                            if (appointment.vin.toLowerCase().includes(search.toLowerCase())) {
                                return appointment;
                            } else if (search.toLowerCase() === "") {
                                return appointment;
                            }
                            return false;
                        })
                        .map(appointment => {
                                const vipStatus = getVipStatus(appointment.vin);
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{vipStatus}</td>
                                        <td>{appointment.customer}</td>
                                        <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                        <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name} </td>
                                        <td>{appointment.reason}</td>
                                        <td>{appointment.status}</td>
                                    </tr>
                            )
                        })}

                    </tbody>
                </table>
            </form>
        </div>

    )
}

export default ServiceHistory;
