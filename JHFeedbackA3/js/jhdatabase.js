/*
PROG 2430 Sec. 3
Professor: Sabbir Ahmed
By: Justin Harvey
Created: February 2020
jhdatabase.js
email: jharvey7599@conestogac.on.ca
*/
// Function to create add values to local storage
function createStorage() {
    var content = $("#jhDefaultReviewer").val();
    localStorage.setItem("DefaultEmail",content);
}
// Function to create local storage with default values
function defaultEmail() {
    localStorage.setItem("DefaultEmail","jharvey7599@conestogac.on.ca");
    $("#jhDefaultReviewer").attr("value", "jharvey7599@conestogac.on.ca");
}
var db;

function errorHandler(tx, error) {
    console.error("SQL error: "+ tx + " ( " + error.code + ") -- " + error.message);
}

var DB = {
    JHcreateDatabase:function(){
        var shortName = "JHFeedbackDB";
        var version = "1.0";
        var displayName = "DB for Feedback app";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess(){
            console.info("Success: Database creation successful");
        }
        db = openDatabase(shortName,version,displayName,dbSize, dbCreateSuccess);

    },
    JHcreateTables: function(){
        function txFunction(tx){
            var sqlDrop = "DROP TABLE IF EXISTS type;";
            var options = [];
            function successCallback(){
                console.info("Success: Table dropped successfully");
            }
            tx.executeSql(sqlDrop, options, successCallback, errorHandler);
            var sqlType = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sqlType, options, successCallback, errorHandler);
            var sqlInsertOne = "INSERT INTO type(name) VALUES('Other');";
            tx.executeSql(sqlInsertOne, options, successCallback, errorHandler);
            var sqlInsertTwo = "INSERT INTO type(name) VALUES('Canadian');";
            tx.executeSql(sqlInsertTwo, options, successCallback, errorHandler);
            var sqlInsertThree = "INSERT INTO type(name) VALUES('Asian');";
            tx.executeSql(sqlInsertThree, options, successCallback, errorHandler);
            var sqlReview = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            tx.executeSql(sqlReview, options, successCallback, errorHandler);

        }

        function successTransaction(){
            console.info("Success: Transaction successful");
        }


        db.transaction(txFunction, errorHandler,successTransaction);
    },
    JHdropTableReview: function() {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS review;";
            var options = [];

            function successCallback() {
                console.info("Success: Table dropped successfully");
            }


            tx.executeSql(sql, options, successCallback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }


        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
