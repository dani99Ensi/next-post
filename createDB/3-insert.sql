\c popdb
INSERT INTO
    popUserTable(pop_user_id,first_name,last_name)
VALUES
    (1,'Main','User'),
    (2,'Willie','Nelson');
ALTER SEQUENCE popUserTable_pop_user_id_seq RESTART WITH 3;