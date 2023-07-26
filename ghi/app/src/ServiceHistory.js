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
        getAutomobiles(automobiles);
    }, [])




    return (
        <div className="p-4 mt-4">
            <h1>Service History</h1>
            <form>
                <div id="search-bar">
                    <input type="text" onChange={e => setSearch(e.target.value)} placeholder='Search by Vin..'/>

                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Vip</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.filter((item) => {
                            if (item.vin.toLowerCase().includes(search)) {
                                return item;
                            } else if (search.toLowerCase() === "") {
                                return item;
                            }
                        })
                        .map(appointment => {
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                    {automobiles.reduce(automobile => {
                                        if (automobile.vin === appointment.vin) {
                                            return (
                                                <td key={automobile.id}>yes</td>
                                            )
                                        } else {
                                            return (
                                                <td key={automobile.id}>no</td>
                                            )
                                        }
                                    })}
                                        <td>{appointment.customer}</td>
                                        <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                        <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                        <td>{appointment.technician.first_name}</td>
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
