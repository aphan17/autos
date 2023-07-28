import React, { useEffect, useState } from 'react';

function AutomobileForm() {
    const[color, setColor] = useState('');
    const[year, setYear] = useState('');
    const[vin, setVin] = useState('');
    const[model, setModel] = useState('');
    const[models, setModels] = useState([]);
    const [createSuccess, setCreateSuccess] = useState(false);


    async function getModels(){
      const modelUrl = 'http://localhost:8100/api/models/'
      const response = await fetch(modelUrl);

      if (response.ok){
        const data = await response.json();
        const models = data.models
        setModels(models)
      }
    }
    useEffect(() => {
      getModels();
    }, []);


    async function handleSumbit(event) {
        event.preventDefault();
        const data = {
          color,
          year,
          vin,
          model_id: model,
        };
        console.log(data);

        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok){
                setColor('');
                setYear('');
                setVin('');
                setModel('');
                setCreateSuccess(true);
            };
      }

    function handleColorChange (event) {
        const value = event.target.value;
        setColor(value);
      }
    function handleYearChange (event) {
        const value = event.target.value;
        setYear(value);
      }
    function handleVinChange (event) {
        const value = event.target.value;
        setVin(value);
      }
    function handleModelChange (event) {
        const value = event.target.value;
        setModel(value);
      }


    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (createSuccess) {
        messageClasses = "alert alert-success mb-0";
        formClasses = "d-none";
    }



    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create an Automobile</h1>
            <form onSubmit={handleSumbit} className={formClasses}id="add-automobile">
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleYearChange} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control"/>
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleVinChange} value={vin} placeholder="Vin" type="text" maxLength="17" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Vin</label>
              </div>
              <div className="mb-3">
                <select onChange={handleModelChange} value={model} required name="model_id" id="model" className="form-select">
                  <option value="">Choose a Model...</option>
                  {models.map(model => {
                    return (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    )
                  })}
                  </select>
                </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Success! Automobile created!
            </div>
          </div>
        </div>
      </div>
    )
}

export default AutomobileForm;
