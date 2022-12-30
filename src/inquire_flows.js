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
                let newD = { ...d };
                newD.value = newD.id;
                return newD;
            }),
            name: "department_id",
        },
    ];
}

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
    let m = managers.map((m) => {
        let newM = { ...m };
        newM.name = `${newM.first_name} ${newM.last_name}`;
        newM.value = newM.id;
        return newM;
    });
    m.push({ name: "None", value: null });
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
            choices: roles.map((r) => {
                let newR = { ...r };
                newR.name = newR.title;
                newR.value = newR.id;
                return newR;
            }),
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
    actionForSelection,
};
