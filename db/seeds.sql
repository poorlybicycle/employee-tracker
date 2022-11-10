--seeds for department table in schema--
INSERT INTO department (name)
VALUES ("Finance"),
        ("HR");


--seeds for role table in schema--
INSERT INTO role (title, salary, department_id)
VALUES ("Loan Officer", 50000, 1),
        ("Manager", 70000, 2),
        ("Greeter", 24000, 1);


--seeds for employee table in schema--
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Billy", "Jones", 1, NULL),
        ("Hannah", "Smith", 2, NULL),
        ("Chris", "Hancock", 3, 2);
