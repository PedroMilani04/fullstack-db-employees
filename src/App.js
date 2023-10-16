import './App.css';
import React from 'react';
import { useState } from 'react';
function App() {
  const [returnedData, setReturnedData] = useState({ EmployeeID: 0, Firstname: '', Lastname: '', Age: 0, Gender: '' });
  const [employee, setEmployee] = useState({ EmployeeID: 0, Firstname: '', Lastname: '', Age: 0, Gender: '' });

  const setInput = (e) => {
    const { name, value } = e.target;
    if (name === 'EmployeeID' || name === 'Age') {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: parseInt(value)
      }));
    } else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const getData = async () => {
    console.log(employee);
    const newData = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: employee.Firstname
      })
    }).then((res) => res.json());
    console.log(newData);
    setReturnedData(newData[0]);
  };

  const createEmployee = async () => {
    const newData = await fetch('/quit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        ...employee
      })
    }).then((res) => res.json());
    console.log(newData);
    setReturnedData(newData[0]);
  };
  

  // Check if returnedData is an object and render accordingly
  const renderData = () => {
    if (typeof returnedData === 'object' && returnedData.EmployeeID) {
      return (
        <>
          <p>EmployeeID: {returnedData.EmployeeID}</p>
          <p>Firstname: {returnedData.Firstname}</p>
          <p>Lastname: {returnedData.Lastname}</p>
          <p>Age: {returnedData.Age}</p>
          <p>Gender: {returnedData.Gender}</p>
        </>
      );
    } else {
      // Handle the case where the data is not available
      return <p>Data not available</p>;
    }
  };

  return (
    <div className="App">
      <input type="number" name="EmployeeID" placeholder="EmployeeID" onChange={setInput}></input>
      <input name="Firstname" placeholder="Firstname" onChange={setInput}></input>
      <input name="Lastname" placeholder="Lastname" onChange={setInput}></input>
      <input type="number" name="Age" placeholder="Age" onChange={setInput}></input>
      <input name="Gender" placeholder="Gender" onChange={setInput}></input>
      <button onClick={() => getData()}>Get</button>
      <button onClick={() => createEmployee()}>Insert</button>
      {renderData()}
    </div>
  );
}


export default App;
