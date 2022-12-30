SELECT
    a.first_name,
    a.last_name,
    role.title,
    role.salary,
    department.name AS department,
    IFNULL (CONCAT (b.last_name, ', ', b.first_name), 'None') AS 'manager'
FROM
    employee a
    LEFT JOIN employee b ON a.manager_id = b.id
    JOIN `role` ON a.role_id = role.id
    JOIN `department` ON role.department_id = department.id;