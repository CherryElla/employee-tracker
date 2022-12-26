const MENU_OPTS = [
    { text: "view all departments" },
    { text: "view all roles" },
    { text: "view all employees" },
    { text: "add a department" },
    { text: "add a role" },
    { text: "add an employee" },
    { text: "update an employee role" },
];

const MAIN_MENU = [
    // view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    {
        type: "list",
        message: "Make a selection",
        name: "selection",
        choices: MENU_OPTS.map((opts) => opts.text),
    },
];
const ADD_DEPARTMENT = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "name",
    },
];

const ADD_ROLE = [
    {
        type: "input",
        message: "Role title?",
        name: "title",
    },
    {
        type: "input",
        message: "Role salary?",
        name: "salary",
    },
    {
        type: "input",
        message: "Role department id?",
        name: "department_id",
    },
];

function makeUpdateEmployeeFlow(firstName, roles) {
    return [
        {
            type: "list",
            message: `Select a new role for ${firstName}`,
            choices: roles,
            name: "newRole",
        },
    ];
}

function makeAddEmployeeFlow(roles, managers) {
    return [
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: roles,
            name: "role",
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: managers,
            name: "manager",
        },
    ];
}

module.exports = {
    MAIN_MENU,
    ADD_DEPARTMENT,
    makeAddEmployeeFlow,
    ADD_ROLE,
    makeUpdateEmployeeFlow,
    MODIFY_EMPLOYEE,
    GET_EMPLOYEE_ID,
};
