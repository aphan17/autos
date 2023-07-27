import {useState, useEffect } from 'react';

function VehicleModelList() {
    const [models, setModels] = useState([]);

    async function getModels() {
        const response = await fetch("http://localhost:8100/api/models/")
        if (response.ok) {
            const data = await response.json();
            const models = data.models;
            setModels(models);
        }
    } useEffect(()=> {
        getModels();
    }, [])



    return (
        <table className = "table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model=> {
                    return (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td><img src={model.picture_url} alt="model of a car" className='img-fluid' width="300" ></img></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default VehicleModelList;
