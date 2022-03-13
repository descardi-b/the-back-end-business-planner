INSERT INTO department (name)
VALUES
('Accounting'),
('Communications'),
('Finance'),
('Legal'),
('Operations'),
('Research');

INSERT INTO role (title, salary, department_id)
VALUES
('Senior Accountant', 80000, 1),
('Content Strategist', 50000, 2),
('Investment Manager', 130000, 3),
('Paralegal', 45000, 4),
('Custodian', 40000, 5),
('Director of Asset Management', 450000, 3),
('Lead Analyst', 95000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Phoebe', 'Bridgers', 1, NULL),
('Lucy', 'Dacus', 3, 4),
('Julien','Baker', 4, NULL),
('Michelle', 'Zauner', 6, NULL),
('Indigo', 'De Souza', 7, NULL);
