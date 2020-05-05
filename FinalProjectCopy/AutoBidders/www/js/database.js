/**
 * File Name: database.js
 *
 * Revision History:
 *       Justin Harvey & Morgan Walker, 2020-04-12 : Created
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL error: "+ tx + " ( " + error.code + ") -- " + error.message);
}
var DB = {
    createDatabase: function (){
        var shortName = "AutoBiddersDB";
        var version = "1.0";
        var displayName = "DB for AutoBidders app";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database creation successful");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

    },
    createTables: function () {
        function txFunction(tx){
            var sqlDrop = "DROP TABLE IF EXISTS signup;";
            var options = [];
            function successCallback(){
                console.info("Success: Table dropped successfully");
            }
            tx.executeSql(sqlDrop, options, successCallback, errorHandler);
            var sqlAuction = "CREATE TABLE IF NOT EXISTS auction( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "model VARCHAR(30) NOT NULL," +
                "make VARCHAR(30) NOT NULL," +
                "year INTEGER," +
                "startingBid INTEGER NOT NULL," +
                "damage VARCHAR(30) NOT NULL," +
                "aucname VARCHAR(30) NOT NULL," +
                "aucemail VARCHAR(30) NOT NULL," +
                "aucphone VARCHAR(30) NOT NULL," +
                "aucLocation VARCHAR(30) NOT NULL);";
            tx.executeSql(sqlAuction, options, successCallback, errorHandler);

            var sqlBids = "CREATE TABLE IF NOT EXISTS bid( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "auctionId INTEGER NOT NULL," +
                "bidAmount INTEGER NOT NULL," +
                "bidderName VARCHAR(30) NOT NULL," +
                "bidderEmail VARCHAR(30) NOT NULL," +
                "FOREIGN KEY(auctionId) REFERENCES auction(id));";
            tx.executeSql(sqlBids, options, successCallback, errorHandler);

            var sqlSignUp = "CREATE TABLE IF NOT EXISTS signup( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(30) NOT NULL," +
                "email VARCHAR(30) NOT NULL," +
                "age DATE," +
                "phone VARCHAR(30) NOT NULL);";
            tx.executeSql(sqlSignUp, options, successCallback, errorHandler);

        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }


        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTableAuction: function() {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS auction;";
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
