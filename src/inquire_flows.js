const MENU_OPTS = [
    { text: "view all departments", action: "viewDepts" },
    { text: "view all roles", action: "viewRoles" },
    { text: "view all employees", action: "viewEmployees" },
    { text: "add a department", action: "addDept" },
    { text: "add a role", action: "addRole" },
    { text: "add an employee", action: "addEmployee" },
    { text: "update an employee role", action: "updateEmployee" },
    { text: "EXIT", action: "exit" },
];

function actionForSelection(text) {
    for (let opt of MENU_OPTS) {
        if (text === opt.text) {
            return opt.action;
        }
    }
    return null;
}

const MAIN_MENU = [
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

function makeAddRoleFlow(departments) {
    return [
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
            type: "list",
            message: "Select department",
            choices: departments.map((d) => {
                return {
                    value: d.id,
                    ...d,
                };
            }),
            name: "department_id",
        },
    ];
}

function makeSelectEmployeeFlow(employees) {
    let e = employees.map((emp) => {
        return {
            name: `${emp.first_name} ${emp.last_name}`,
            value: { ...emp },
        };
    });
    return [
        {
            type: "list",
            message: "Select an employee",
            choices: e,
            name: "employee",
        },
    ];
}

function makeUpdateEmployeeFlow(firstName, roles) {
    let r = roles.map((role) => {
        return {
            name: role.title,
            value: { ...role },
        };
    });
    return [
        {
            type: "list",
            message: `Select a new role for ${firstName}`,
            choices: r,
            name: "role",
        },
    ];
}

function makeAddEmployeeFlow(roles, managers) {
    let m = managers.map((m) => {
        return {
            name: `${m.first_name} ${m.last_name}`,
            value: m.id,
        };
    });
    m.push({ name: "None", value: null });
    let r = roles.map((r) => {
        return {
            name: r.title,
            value: r.id,
        };
    });
    return [
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: r,
            name: "role_id",
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager_id",
            choices: m,
        },
    ];
}

module.exports = {
    MAIN_MENU,
    ADD_DEPARTMENT,
    makeAddEmployeeFlow,
    makeAddRoleFlow,
    makeUpdateEmployeeFlow,
    makeSelectEmployeeFlow,
    actionForSelection,
};
