/*
PROG 2430 Sec. 3
Professor: Sabbir Ahmed
By: Justin Harvey
Created: February 2020
jhfeedbackDAL.js
email: jharvey7599@conestogac.on.ca
*/
var Review = {
    JHinsert: function (options, callback) {
        function txFunction(tx){
            var sql ="INSERT INTO review(businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating,rating1,rating2,rating3) values(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback,errorHandler);
        }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    },
    JHselectAll: function (options, callback) {  function txFunction(tx){
        var sql ="SELECT * FROM review;";
        tx.executeSql(sql, options, callback,errorHandler);
    }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    },
    JHselect: function (options, callback) {  function txFunction(tx){
        var sql ="SELECT * FROM review WHERE id=?;";
        tx.executeSql(sql, options, callback,errorHandler);
    }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)},
    JHupdate: function (options, callback) {  function txFunction(tx){
        var sql ="UPDATE review SET businessName=?, typeId=?, reviewerEmail=?, reviewerComments=?,reviewDate=?,hasRating=?,rating1=?,rating2=?,rating3=? WHERE id=?;";
        tx.executeSql(sql, options, callback,errorHandler);
    }
        function successTransaction(){
            console.info("Success: Update successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    },
    JHdelete: function (options, callback) {  function txFunction(tx){
        var sql ="DELETE FROM review WHERE id=?;";
        tx.executeSql(sql, options, callback,errorHandler);
    }
        function successTransaction(){
            console.info("Success: Delete successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
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
var Type = {
    JHselectAll: function (options, callback) {
        function txFunction(tx){
        var sql ="SELECT * FROM type;";
        tx.executeSql(sql, options, callback,errorHandler);
    }
        function successTransaction(){
            console.info("Success: Select All successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction)
    }
};
