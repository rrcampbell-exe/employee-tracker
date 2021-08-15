INSERT INTO departments (dept_name)
VALUES
    ('Front of House'),
    ('Back of House'),
    ('Management'),
    ('Administration');

INSERT INTO roles (job_title, salary,  department_id)
VALUES
    ('Host', 35000.00, 1),
    ('Waitstaff', 34000.00, 1),
    ('Bartender', 39000.00, 1),
    ('Barback', 33000.00, 1),
    ('Line Cook', 34000.00, 2),
    ('Dishwasher', 31200.00, 2),
    ('Prep Cook', 32000.00, 2),
    ('Chef', 50000.00, 2),
    ('Shift Supervisor', 41000.00, 3),
    ('Assistant Manager', 45000.00, 3),
    ('General Manager', 55000.00, 3),
    ('Accountant', 45000.00, 4),
    ('Marketing Rep', 45000.00, 4);

INSERT INTO employees (first_name, last_name, job_title_id, manager_id)
VALUES
    ('Hyrum', 'Harouna', 11, 1),
    ('Ean', 'Christen', 10, 1),
    ('Darina', 'Liliya', 10, 1),
    ('Helena', 'Padma', 1, 2),
    ('Geraint', 'Gianpiero', 2, 2),
    ('Eógan', 'Neelam', 2, 2),
    ('Raheem', 'Josephus', 2, 2),
    ('Voula', 'Simon', 1, 2),
    ('Bhavana', 'Hamish', 3, 2),
    ('Hagit', 'Uno', 3, 2),
    ('Elijah', 'Mel', 4, 2),
    ('Chris', 'Fabijan', 4, 2),
    ('Urbano', 'Kory', 5, 3),
    ('Jaroslava', 'Zerachiel', 5, 3),
    ('Murdoch', 'Melvyn', 7, 3),
    ('Seisyll', 'Ryôta', 8, 3),
    ('Gunn', 'Jana', 9, 3),
    ('Tyrese', 'Elviira', 6, 3),
    ('Proserpine', 'Zvonko', 6, 3),
    ('Ilene', 'Ekewaka', 9, 2),
    ('Cyril', 'Figgis', 12, 1),
    ('Hlengiwe', 'Gaylord', 13, 1);


