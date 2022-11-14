# Employees-API
This application was implementd in node.js and mysql to manage employees

## Requirements
- NodeJS >= 12.x
- Npm >= 6.9
- Mysql >= 8.0
## Steps
- Create a db and a user with permissions
```sql
CREATE DATABASE employees_db;
CREATE USER 'employees_user'@'%' IDENTIFIED BY 'employees_password';
CREATE USER 'employees_user'@'localhost' IDENTIFIED BY 'employees_password';
GRANT ALL PRIVILEGES ON employees_db.* TO 'employees_user'@'%';
```
- Configure .env file with your own data

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=employees_db
DB_USER=employees_user
DB_PASSWORD=employees_password
DB_DIALECT=mysql
JWT_SECRET=someJWtSecret123$_

```

- Install dependencies
```
npm install
```

- Run the app
```
npm start
```
## Services 
### Users
#### Sign Up
```bash
curl --location --request POST 'http://localhost:3000/users/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "robertoclavijo@gap.com",
    "password": "somePassword"
}'
```
#### Sing In
```bash
curl --location --request POST 'http://localhost:3000/users/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "robertoclavijo@gap.com",
    "password": "somePassword"
}'
```
Response
```json
{ "token": "theAccessToken"}
```
**NOTE: Include authorization header in all request starting with Bearer**
### Employees
#### Create/Update an employee
If 'id' field does not exist it will be auto-generated
```bash
curl --location --request POST 'http://localhost:3000/employees' \
--header 'Authorization: Bearer theAccessToken' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 11,
    "name": "Juan",
    "surname": "Connor",
    "level": "Senior",
    "salary": 2360.47
}'
```
#### Get an employee by id
```bash
curl --location --request GET 'http://localhost:3000/employees/1234' \
--header 'Authorization: Bearer theAccessToken'
```
#### Delete an employee by id
```bash
curl --location --request DELETE 'http://localhost:3000/employees/12345' \
--header 'Authorization: Bearer theAccessToken'
```
### Logs
To download logs in zip file use the next endpoint. To specify the log level use the 'level' param
```bash
curl --location --request GET 'http://localhost:3000/logs/download?level=info' \
--header 'Authorization: Bearer theAccessToken
```