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
### Create/Update an employee
If 'id' field does not exist it will be auto-generated
```bash
curl --location --request POST 'http://localhost:3000/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1234,
    "name": "Juan",
    "surname": "Connor",
    "level": "Senior",
    "salary": 2360.47
}'
```
### Get an employee by id
```bash
curl --location --request GET 'http://localhost:3000/employees/1234'
```
Response
```json
{
    "id": 1234,
    "name": "Juan",
    "surname": "Connor",
    "level": "Senior",
    "salary": "2360.47",
    "createdAt": "2022-10-21T03:01:15.000Z",
    "updatedAt": "2022-10-21T03:03:24.000Z"
}
```
### Delete an employee by id
```bash
curl --location --request DELETE 'http://localhost:3000/employees/1234'
```