INSERT INTO departments (dept_name)
VALUES
    ('Front of House'),
    ('Back of House'),
    ('Management'),
    ('Administration');

INSERT INTO roles (job_title, department)
VALUES
    ('Host', 'Front of House'),
    ('Waitstaff', 'Front of House'),
    ('Bartender', 'Front of House'),
    ('Barback', 'Front of House'),
    ('Line Cook', 'Back of House'),
    ('Dishwasher', 'Back of House'),
    ('Prep Cook', 'Back of House'),
    ('Chef', 'Back of House'),
    ('Shift Supervisor', 'Management'),
    ('Assistant Manager', 'Management'),
    ('General Manager', 'Management'),
    ('Accountant', 'Administration'),
    ('Marketing Rep', 'Administration');

INSERT INTO employees (first_name, last_name, job_title, department, salary, manager)
VALUES
    ('Helena', 'Padma', 'Host', 'Front of House', 31000, 'Ean Christen'),
    ('Ean', 'Christen', 'Assistant Manager', 'Management', 50000, 'Hyrum Harouna'),
    ('Hyrum', 'Harouna', 'General Manager', 'Management', 70000, 'Self'),
    ('Geraint', 'Gianpiero', 'Waitstaff', 'Front of House', 24000, 'Ean Christen'),
    ('Eógan', 'Neelam', 'Waitstaff', 'Front of House', 32000, 'Ean Christen'),
    ('Raheem', 'Josephus', 'Waitstaff', 'Front of House', 26000, 'Ean Christen'),
    ('Voula', 'Simon', 'Host', 'Front of House', 20000, 'Ean Christen'),
    ('Bhavana', 'Hamish', 'Bartender', 'Front of House', 34000, 'Ean Christen'),
    ('Hagit', 'Uno', 'Bartender', 'Front of House', 38000, 'Ean Christen'),
    ('Elijah', 'Mel', 'Barback', 'Front of House', 30000, 'Ean Christen'),
    ('Chris', 'Fabijan', 'Barback', 'Front of House', 27000, 'Ean Christen'),
    ('Urbano', 'Kory', 'Line Cook', 'Back of House', 27000, 'Darina Liliya'),
    ('Darina', 'Liliya', 'Assistant Manager', 'Management', 52000, 'Hyrum Harouna'),
    ('Jaroslava', 'Zerachiel', 'Line Cook', 'Back of House', 25000, 'Darina Liliya'),
    ('Murdoch', 'Melvyn', 'Prep Cook', 'Back of House', 25000, 'Darina Liliya'),
    ('Seisyll', 'Ryôta', 'Chef', 'Back of House', 60000, 'Hyrum Harouna'),
    ('Gunn', 'Jana', 'Shift Supervisor', 'Management', 40000, 'Darina Liliya'),
    ('Tyrese', 'Elviira', 'Shift Supervisor', 'Management', 40000, 'Darina Liilya'),
    ('Proserpine', 'Zvonko', 'Shift Supervisor', 'Management', 40000, 'Ean Christen'),
    ('Ilene', 'Ekewaka', 'Shift Supervisor', 'Management', 40000, 'Ean Christen'),
    ('Cyril', 'Figgis', 'Accountant', 'Administration', 50000, 'Hyrum Harouna'),
    ('Hlengiwe', 'Gaylord', 'Marketing Rep', 'Administration', 50000, 'Hyrum Harouna');


