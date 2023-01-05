const consoleTable = require("console.table");
const inquirer = require("inquirer");
const { DB } = require("./src/db_helper");
const {
    MAIN_MENU,
    actionForSelection,
    ADD_DEPARTMENT,
    makeAddRoleFlow,
    makeAddEmployeeFlow,
    makeUpdateEmployeeFlow,
    makeSelectEmployeeFlow,
} = require("./src/inquire_flows");

// let response = await inquirer.prompt(ADD_EMPLOYEE)

async function addDepartment(db) {
    let dpResponse = await inquirer.prompt(ADD_DEPARTMENT);
    await db.addDepartment(dpResponse.name);
}

async function addRole(db) {
    let departments = await db.getDepartments();
    let flow = makeAddRoleFlow(departments);
    let response = await inquirer.prompt(flow);
    await db.addRole(response.title, response.salary, response.department_id);
}

async function addEmployee(db) {
    let employees = await db.getEmployees(true);
    let roles = await db.getRoles(true);
    let flow = makeAddEmployeeFlow(roles, employees);
    let response = await inquirer.prompt(flow);
    await db.addEmployee(
        response.first_name,
        response.last_name,
        response.role_id,
        response.manager_id
    );
}

async function updateEmployee(db) {
    let employees = await db.getEmployees(true);
    let roles = await db.getRoles(true);
    let flow = makeSelectEmployeeFlow(employees);
    let response = await inquirer.prompt(flow);
    let employee = response.employee;
    console.log(employee);
    flow = makeUpdateEmployeeFlow(employee.first_name, roles);
    response = await inquirer.prompt(flow);
    let role = response.role;
    console.log(role);
    // await db.updateEmployee(employee.id, role.id)
}

function printWelcome() {
    console.log(
        `
        ╔═╗┬ ┬┌─┐┬─┐┬┌─┐'┌─┐     
        ║  ├─┤├┤ ├┬┘│├┤  └─┐     
        ╚═╝┴ ┴└─┘┴└─┴└─┘ └─┘     
        ╔═╗┌┬┐┌─┐┬  ┌─┐┬ ┬┌─┐┌─┐
        ║╣ │││├─┘│  │ │└┬┘├┤ ├┤ 
        ╚═╝┴ ┴┴  ┴─┘└─┘ ┴ └─┘└─┘
        ╔╦╗┌─┐┌┐┌┌─┐┌─┐┌─┐┬─┐   
        ║║║├─┤│││├─┤│ ┬├┤ ├┬┘   
        ╩ ╩┴ ┴┘└┘┴ ┴└─┘└─┘┴└─                                 
    `);
}

async function main() {
    printWelcome();
    let db = new DB();
    db.connect();
    quit = false;
    while (!quit) {
        let response = await inquirer.prompt(MAIN_MENU);
        let action = actionForSelection(response.selection);
        switch (action) {
            case "viewDepts":
                let depts = await db.getDepartments();
                console.table(depts);
                break;
            case "viewRoles":
                let roles = await db.getRoles();
                console.table(roles);
                break;
            case "viewEmployees":
                let employees = await db.getEmployees();
                console.table(employees);
                break;
            case "addDept":
                await addDepartment(db);
                break;
            case "addRole":
                await addRole(db);
                break;
            case "addEmployee":
                await addEmployee(db);
                break;
            case "updateEmployee":
                await updateEmployee(db);
                break;
            case "exit":
                quit = true;
                break;
        }
    }
    console.log("GOODBYE");
    process.exit();
}

main();
