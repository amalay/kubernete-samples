'use strict';
const mysql = require('mysql2');
const dbConn = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_ROOT_USER, password: process.env.MYSQL_ROOT_PASSWORD, database: process.env.MYSQL_DATABASE });

dbConn.connect(function(err) {
  if (err){
    throw err;
  } 
  
  console.log("Mysql database connected successfully!");

  var personTable = `CREATE TABLE IF NOT EXISTS person (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(25) NOT NULL,
    LastName VARCHAR(25) NOT NULL)`;

    dbConn.query(personTable);
});
  
exports.createPerson = async (data, callback) => {
    dbConn.query("INSERT INTO person set ?", data, async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result.insertId);
    });
}

exports.updatePerson = async (id, data, callback) => {
    dbConn.query("UPDATE person SET FirstName = ?, LastName = ? WHERE id = ?", [data.FirstName, data.LastName, id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.deletePerson = async (id, callback) => {
    dbConn.query("DELETE FROM person WHERE id = ?", [id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.getPerson = async (id, callback) => {
    dbConn.query("Select * from person where id = ? ", id, async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.getPersons = async (callback) => {
    dbConn.query("Select * from person", async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}