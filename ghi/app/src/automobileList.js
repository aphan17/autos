import { useState, useEffect } from "react";

function AutomobilesList() {
const [list, setList] = useState([]);

async function fetchAutoData() {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const list = data.autos
        setList(list)
    } else {
        console.error("An error occured fetching the data")
    }
}

useEffect(() => {
    fetchAutoData()
}, []);

function getSoldStatus(autoSold) {
    if (autoSold === true){
        return "Yes";
    } else {
        return "No";
    }
}

return (
    <div>
        <>
        <h1>Automobiles</h1>
        </>
        <table className="table table-striped">
            <thead>
                <tr className="table-success">
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {list.map(auto => {
                    const soldStatus = getSoldStatus(auto.sold);
                    return (
                        <tr key={auto.id} value={auto.id}>
                            <td>{auto.vin}</td>
                            <td>{auto.color}</td>
                            <td>{auto.year}</td>
                            <td>{auto.model.name}</td>
                            <td>{auto.model.manufacturer.name}</td>
                            <td>{auto.sold}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
)
}

export default AutomobilesList;
