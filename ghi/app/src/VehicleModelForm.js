import {useState, useEffect} from 'react';

function VehicleModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl]= useState('');
    const [createSuccess, setCreateSuccess] = useState(false);

    async function getManufacturers(){
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const manufacturers = data.manufacturers;
            setManufacturers(manufacturers);
        }
    }
    useEffect(()=> {
        getManufacturers();
    }, [])

    async function handleSumbit(event) {
        event.preventDefault();
        const data = {
            name,
            picture_url: pictureUrl,
            manufacturer_id: manufacturer,
        };

        const modelURL = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(modelURL, fetchConfig);
        if (response.ok) {
            setName('');
            setPictureUrl('')
            setManufacturer('');
            setCreateSuccess(true);
        }
    }


    function handleNameChange(event) {
        const {value} = event.target;
        setName(value);
    }

    function handlePictureUrlChange(event) {
        const {value} = event.target;
        setPictureUrl(value);
    }

    function handleManufacturerChange(event) {
        const {value} = event.target;
        setManufacturer(value);
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (createSuccess) {
        messageClasses = "alert alert-success mb-0";
        formClasses = "d-none";
    }

    return (
        <div className="shadow p-4 mt-4">
            <h1>Create a new model</h1>
            <form onSubmit={handleSumbit} className={formClasses}>
                <div className="form-floating mb-3">
                    <input className="form-control" value={name} onChange={handleNameChange} placeholder='Name' type='text' name='name' id='name'/>
                    <label htmlFor='name'>Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" value={pictureUrl} onChange={handlePictureUrlChange} placeholder='PictureURL' type='text' name='picture_url' id='picture_url'/>
                    <label htmlFor='picture_url'>PictureURL</label>
                </div>
                <div className="mb-3">
                    <select required value={manufacturer} onChange={handleManufacturerChange} name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose a manufacturer</option>
                    {manufacturers.map(manufacturer => {
                        return (
                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                        )
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Success! Vehicle Model created!
            </div>
        </div>

    )
}

export default VehicleModelForm;
