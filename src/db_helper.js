const sql = require("mysql2/promise");
const bluebird = require("bluebird");

class DB {
    constructor(
        host = "localhost",
        port = 3306,
        user = "root",
        dbName = "employee_db"
    ) {
        this.connection = null;
        this.host = host;
        this.user = user;
        this.dbName = dbName;
        this.port = port;
    }

    async connect() {
        // create the connection to database
        this.connection = await sql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: "FXE.WHg9sLou.DJsiW*T",
            database: this.dbName,
            Promise: bluebird,
        });
    }

    async query(query) {
        // simple query
        try {
            let results = await this.connection.query(query);
            // console.log(results); // results contains rows returned by server
            //     console.log(fields); // fields contains extra meta data about results, if available
            return results[0];
        } catch (err) {
            console.log(err);
        }
        return null;
    }

    async getDepartments() {
        return await this.query("SELECT * from `department`;");
    }

    async getEmployees(allColumns = false) {
        let q = "";
        if (allColumns) {
            q += "SELECT * FROM employee a ";
        } else {
            q += `SELECT
                a.first_name,
                a.last_name,
                role.title,
                role.salary,
                department.name AS department,
                IFNULL (CONCAT (b.last_name, ', ', b.first_name), 'None') AS 'manager'
            FROM
                employee a `;
            q += "LEFT JOIN employee b ON a.manager_id = b.id ";
        }
        q += "JOIN `role` ON a.role_id = role.id ";
        q += "JOIN `department` ON role.department_id = department.id;";
        return await this.query(q);
    }

    async getRoles(allCols=false) {
        let q = ""
        if (allCols) {
            q += `SELECT * FROM role;`
        } else {
            q += `SELECT 
            title,
            salary,
            department.name AS department
            FROM role JOIN department ON role.department_id = department.id`;
        }
        return await this.query(q);
    }

    async getEmployee(id) {
        let q = `SELECT * FROM employee WHERE id = ${id};`;
        return await this.query(q);
    }

    async getRole(id) {
        let q = `SELECT * FROM role WHERE id = ${id};`;
        return await this.query(q);
    }

    async getDepartment(id) {
        let q = `SELECT * FROM department WHERE id = ${id};`;
        return await this.query(q);
    }

    async updateEmployee(id, newRoleId) {
        let q = `UPDATE employee 
            SET role_id = ${newRoleId}
            WHERE id = ${id};`;
        return await this.query(q);
    }

    async addRole(title, salary, departmentId) {
        let q = `INSERT INTO role (title, salary, departmentId)
        VALUES (
            "${title}",
            ${salary},
            ${departmentId});`;
        return await this.query(q);
    }

    async addDepartment(name) {
        let q = `INSERT INTO department (name)
        VALUES ("${name}");`;
        return await this.query(q);
    }

    async addEmployee(firstName, lastName, roleId, managerId) {
        let q = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (
            "${firstName}",
            "${lastName}",
            ${roleId},
            ${managerId}
        )`;
        return await this.query(q);
    }
}

module.exports = { DB };
