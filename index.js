var fs = require('fs');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employees_db'
});


// prompts for adding and viewing depts/roles/employees
function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectChoices',
                message: "Please select one of these:",
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            },
        ])
        .then((answers) => {
            if (answers.selectChoices == 'view all departments') {
                connection.query(
                    'SELECT * FROM department',
                    function (err, results, fields) {
                        console.table(results);
                        init();
                    }
                )
            }

            else if (answers.selectChoices == 'view all roles') {
                connection.query(
                    'SELECT * FROM role',
                    function (err, results, fields) {
                        console.table(results);
                        init();
                    }
                )
            }
            else if (answers.selectChoices == 'view all employees') {
                connection.query(
                    'SELECT * FROM employee',
                    function (err, results, fields) {
                        console.table(results);
                        init();
                    }
                )
                //func to add a department
            }
            else if (answers.selectChoices == 'add a department') {
                addDept()

                //func to add a role
            }
            else if (answers.selectChoices == 'add a role') {
                addRole()
            }
            else if (answers.selectChoices == 'add an employee') {
                addEmployee()
            }
        })
        .catch((error) => {
            console.log(error)
            if (error.isTtyError) {
                console.log(["Couldn't be rendered in the current environment"]);
            } else {
                console.log(["Something else went wrong"]);
            }
        }); //do I need this semicolon??
}


//create prompt for when you add a department
function addDept() {
    inquirer.prompt({
        message: "What's the new department?",
        type: 'input',
        name: 'newDept',
    }).then(answers => {
        console.log(answers)
        connection.query(
            'INSERT INTO department(name) VALUES (?)',
            [answers.newDept],
            function (err, results, fields) {
                console.table(results);
                init();
            }
        )
    })
};

//function to add a new role and prompts
function addRole() {
    inquirer.prompt([{
        message: "What's the new role?",
        type: 'input',
        name: 'newRole',
    },
    {
        message: "What's the new role's salary?",
        type: 'input',
        name: 'newSalary',
    },
    {
        message: "What's the new role's department ID?",
        type: 'input',
        name: 'newDeptID',
    }
    ]).then(answers => {
        //console.log(answers)
        connection.query(
            'INSERT INTO role(title, salary, department_id) VALUES (?,?,?)',
            [answers.newRole,answers.newSalary,answers.newDeptID],
            function (err, results, fields) {
                console.table(results);
                init();
            }
        )
    })
};

//add employee func here
function addEmployee() {
    inquirer.prompt([{
        message: "What's the new employee's first name?",
        type: 'input',
        name: 'newEmpFirst',
    },
    {
        message: "What's the new employee's last name?",
        type: 'input',
        name: 'newEmpLast',
    },
    {
        message: "What's the new employee's role ID?",
        type: 'input',
        name: 'newRoleID',
    },
    {
        message: "What's the new employee's manager ID?",
        type: 'input',
        name: 'newManagerID',
    }
    ]).then(answers => {
        //console.log(answers)
        connection.query(
            'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
            [answers.newEmpFirst,answers.newEmpLast,answers.newRoleID,answers.newManagerID],
            function (err, results, fields) {
                console.table(results);
                init();
            }
        )
    })
};

// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, (err) => console.log(err))
// };

init();