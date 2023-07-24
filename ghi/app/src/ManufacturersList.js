import {useState, useEffect } from 'react';

function ManufacturersList() {

    const [manufacturers, setManufacturers] = useState([]);

    async function getManufacturers() {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if (response.ok) {
            const data = await response.json();
            const manufacturers = data.manufacturers
            setManufacturers(manufacturers)
        } else {
            console.error('An error occured fetching the data')
        }
    }
    useEffect(() => {
        getManufacturers();
    })


    return (
        <table className = "table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ManufacturersList;
