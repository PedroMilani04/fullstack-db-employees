const express = require('express')
//const Employee = require('./dbFiles/Employee')
const dbOperation = require('./dbFiles/dbOperation')
const cors = require('cors')

const API_PORT = process.env.port || 5000;
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

app.post('/api', async (req, res) => {
    console.log('Called');
    const result = await dbOperation.getEmployees(req.body.name);
    res.send(result.recordset)
})

app.post('/quit', async (req, res) => {
    await dbOperation.createEmployee(req.body)
    const result = await dbOperation.getEmployees(req.body.Firstname);

    console.log('Called quit');
    res.send(result.recordset)
})



/* let Pam = new Employee(105602, 'Pam', 'DFG', 29, 'Female');
let Pamr = new Employee(1, 'Parrr4rrm', 'DFG', 29, 'Female');
let Mark = new Employee(1002, 'Mark', 'Mark', 29, 'Male'); */


app.listen(API_PORT, () => console.log(`Listening to ${API_PORT}`))

