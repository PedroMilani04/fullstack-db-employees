const config = require('./dbConfig')
const sql = require('mssql')

const getEmployees = async(firstname) => {
    try {
        let pool = await sql.connect(config);
        let employees = pool.request().query(`SELECT * FROM EmployeeDemographics WHERE Firstname = '${firstname}'`)
        console.log(employees);
        return employees;
    }
    catch(error) {
        console.log(error);
    }
}
const   createEmployee = async(Employee) => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query(`INSERT INTO EmployeeDemographics VALUES (${Employee.EmployeeID}, '${Employee.Firstname}', '${Employee.Lastname}', ${Employee.Age}, '${Employee.Gender}' )`)
        console.log(employees);
        return employees;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    getEmployees,
    createEmployee
}