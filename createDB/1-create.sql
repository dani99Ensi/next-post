CREATE DATABASE popdb;
create user popuser with password 'popUserPass' SUPERUSER;
grant all privileges on database popdb to popuser;