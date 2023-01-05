INSERT INTO department (id, name)
VALUES 
(1, "Engineering"),
(2, "Marketing"),
(3, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "Manager", 100000, 1),
(2, "Intern", 25000, 2),
(3, "Employee", 80000, 3),
(4, "Supervisor", 150000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, "John", "Smith", 1, NULL),
(2, "Charlie", "Evens", 3, 1),
(3, "Kathy", "Bench", 4, 1),
(4, "Evelyn", "Saddle", 2, 2),
(5, "Sofia", "Pot", 2, 3),
(6, "Betty", "Jeans", 4, 1),
(7, "David", "Jones", 2, 1);
    
