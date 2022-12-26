const inquirer = require("inquirer")


let response = await inquirer.prompt([
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
    },
    {
        type: "input",
        message: "What is the employee's role?",
        name: "role"
    },
    {
        type: "input",
        message: "Who is the employee's manager?",
        name: "manager"
    },
    {   type: "input",
        message: "What would you like to do?",
        name: "toDo"

    }
])