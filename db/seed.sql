INSERT INTO department (id, name)
VALUES  (1, "sales"),
        (2, "human resources"),
        (3, "IT")

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "chicken salesperson", 200000, 1)
       (2, "helpdesk support", 10000, 3)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Jeevan", "Johal", 1, 7)
