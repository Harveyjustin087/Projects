/**
 * File Name: AutoDAL.js
 *
 * Revision History:
 *       Justin Harvey & Morgan Walker, 2020-04-12 : Created
 */

var SignUp = {
    insert: function (options, callback) {
        function txFunction(tx){
            var sql ="INSERT INTO signup(name, email, age, phone) values(?,?,?,?);";
            tx.executeSql(sql, options, callback,errorHandler);
        }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    },
    selectAll: function (options, callback) {
        function txFunction(tx){
            var sql ="SELECT * FROM signup;";
            tx.executeSql(sql, options, callback,errorHandler);
        }
        function successTransaction(){
            console.info("Success: Select All successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    }
};

var Auction = {
    insert: function (options, callback) {
        function txFunction(tx){
            var sql ="INSERT INTO auction(model, make, year, damage, startingBid, aucname, aucemail, aucphone, aucLocation) values(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback,errorHandler);
        }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    },
    select: function (options, callback) {  function txFunction(tx){
        var sql ="SELECT * FROM auction WHERE id=?;";
        tx.executeSql(sql, options, callback,errorHandler);
    }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    },
    selectAll: function (options, callback) {
        function txFunction(tx){
            var sql ="SELECT a.id, a.model, a.make, a.year, MAX(b.bidAmount), a.aucLocation, a.startingBid FROM auction a " +
                "LEFT JOIN bid b " +
                "ON a.id = b.auctionId " +
                "GROUP BY a.id;";
            tx.executeSql(sql, options, callback,errorHandler);
        }
        function successTransaction(){
            console.info("Success: Select All successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    }
};

var Bid = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO bid(auctionId, bidAmount, bidderName, bidderEmail) VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Insert successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM bid WHERE auctionId=? AND bidderEmail=?";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAllBids: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT bidAmount, bidderName " +
                "FROM bid " +
                "WHERE auctionId=? " +
                "ORDER BY bidAmount DESC;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
