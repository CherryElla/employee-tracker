INSERT INTO department (id, name)
VALUES 
(001, "Engineering"),
(002, "Marketing"),
(003, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES 
(001, "Manager", 50000, 001),
(002, "Intern", 50000, 002),
(003, "Employee", 50000, 003),
(004, "Supervisor", 50000, 001);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(001, "John", "Doe", 001, NULL),
(002, "Charlie", "Doe", 003, 001),
(003, "Kathy", "Doe", 004, 001),
(004, "Evelyn", "Doe", 002, 002),
(005, "Sofia", "Doe", 002, 003),
(006, "Betty", "Doe", 004, 001),
(007, "David", "Doe", 002, 001);
    
