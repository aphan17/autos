import {useState, useEffect } from 'react';

function AppointmentList(){
    const [appointments, setAppointments] = useState([]);

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

    function cancelAppointmentStatus(appointmentID) {
        const cancelUrl = `http://localhost:8080/api/appointments/${appointmentID}/cancel/`;
        fetch(cancelUrl, {method: "PUT"}).then(() => {
            window.location.reload();
        })
    }

    function finishAppointmentStatus(appointmentID) {
        const finishUrl = `http://localhost:8080/api/appointments/${appointmentID}/finish/`;
        fetch(finishUrl, {method: "PUT"}).then(() => {
            window.location.reload();
        })
    }


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status Update</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    if (appointment.status === "created") {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.customer}</td>
                                <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                <td>{appointment.technician.id}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <button className="btn btn-danger" type="button" onClick={() => cancelAppointmentStatus(appointment.id)}>Cancel</button>
                                    <button className="btn btn-success" type="button" onClick={() => finishAppointmentStatus(appointment.id)}>Finish</button>
                                </td>
                            </tr>
                    )}
                })}

            </tbody>
        </table>
    )
}

export default AppointmentList;
