CREATE DATABASE popdbfirstphase;
create user popuser with password 'popUserPass' SUPERUSER;
grant all privileges on database popdbfirstphase to popuser;