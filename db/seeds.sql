INSERT INTO departments (dept_name)
VALUES
    ('Front of House'),
    ('Back of House'),
    ('Management'),
    ('Administration');

INSERT INTO roles (job_title, salary,  department_id)
VALUES
    ('Host', 30000.00, 1),
    ('Waitstaff', 30000.00, 1),
    ('Bartender', 30000.00, 1),
    ('Barback', 30000.00, 1),
    ('Line Cook', 30000.00, 2),
    ('Dishwasher', 30000.00, 2),
    ('Prep Cook', 30000.00, 2),
    ('Chef', 30000.00, 2),
    ('Shift Supervisor', 30000.00, 3),
    ('Assistant Manager', 30000.00, 3),
    ('General Manager', 30000.00, 3),
    ('Accountant', 30000.00, 4),
    ('Marketing Rep', 30000.00, 4);

INSERT INTO employees (first_name, last_name, job_title_id, manager_id)
VALUES
    ('Helena', 'Padma', 1, NULL),
    ('Ean', 'Christen', 10, NULL),
    ('Hyrum', 'Harouna', 11, NULL),
    ('Geraint', 'Gianpiero', 2, 2),
    ('Eógan', 'Neelam', 2, 2),
    ('Raheem', 'Josephus', 2, 2),
    ('Voula', 'Simon', 1, 2),
    ('Bhavana', 'Hamish', 3, 2),
    ('Hagit', 'Uno', 3, 2),
    ('Elijah', 'Mel', 4, 2),
    ('Chris', 'Fabijan', 4, 2),
    ('Urbano', 'Kory', 5, NULL),
    ('Darina', 'Liliya', 10, 3),
    ('Jaroslava', 'Zerachiel', 5, 13),
    ('Murdoch', 'Melvyn', 7, 13),
    ('Seisyll', 'Ryôta', 8, 3),
    ('Gunn', 'Jana', 9, 13),
    ('Tyrese', 'Elviira', 9, 13),
    ('Proserpine', 'Zvonko', 9, 2),
    ('Ilene', 'Ekewaka', 9, 2),
    ('Cyril', 'Figgis', 12, 3),
    ('Hlengiwe', 'Gaylord', 13, 3);


