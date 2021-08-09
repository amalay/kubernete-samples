# Docker App in NodeJS with MySql

## Learning Steps


### Code setup from github
1. Clone the repository from https://github.com/amalay/docker-samples/tree/main/node-mysql
2. Start Visual Studio Code and open go to the "node-mysql" folder
3. Run npm install on your terminal to install the required packages.
4. Open Docker Dektop at your local machine. If it not install then install it first.

### Required packages and commands to install
> npm install express --save-dev

> npm install mysql2 --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

### How to run the docker app?
You can run the app in two way either by executing couple of docker commands individually or run the docker-compose command pointing to docker-compose.yml file(Which contains all the required commands in it) on your terminal as below:

> "docker-compose up"

After successfult execution of this command, you can see the docker image, containers and volumes for this project in your docker desktop app as below:

#### Docker Image:
![image](https://user-images.githubusercontent.com/84455469/127822577-641871ad-773c-4dbe-9608-03d4e26f830b.png)

#### Docker Containers:
![image](https://user-images.githubusercontent.com/84455469/127822627-a1cd28c8-ebea-4e4c-a417-d24a23991a5c.png)

#### Docker Volumes:
![image](https://user-images.githubusercontent.com/84455469/127822678-9d32a8b5-0e73-4a2e-85b2-d151d9319010.png)


You can see that both service (node-mysql) and database (mysql) are running at port 5000 and 3307 respectively.

### Sample Request and Response
##### 1. POST: http://localhost:5000/api/mysql
###### Payload:
```json
{    
    "firstName": "Amalay",
    "lastName": "Verma"    
}
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 2
}
```

##### 2. PUT: http://localhost:5000/api/mysql/2
###### Payload:
```json
{    
    "FirstName": "Amalay1234",
    "LastName": "Verma1234"    
}
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

##### 3. DELETE: http://localhost:5000/api/mysql/2
###### Payload:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "message": "Record deleted successfully!"
}
```

##### 4. GET: http://localhost:5000/api/mysql/2
###### Payload:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 2,
            "FirstName": "Amalay",
            "LastName": "Verma"
        }
    ]
}
```

##### 5. GET: http://localhost:5000/api/mysql
###### Payload:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 1,
            "FirstName": "Amalay",
            "LastName": "Verma"
        },
        {
            "Id": 2,
            "FirstName": "Test",
            "LastName": "User"
        }
    ]
}
```
