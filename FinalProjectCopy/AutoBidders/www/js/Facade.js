/**
 * File Name: Facade.js
 *
 * Revision History:
 *       Justin Harvey, 2020-04-12 : Created
 */
function checkValidation() {

    if (doValidate_formAuction()) {
        console.info("form is valid");
    }
    else{
        console.error("form is invalid");
    }
}
function checkSignUpValidation() {

    if (doValidate_formSignUp()) {
        console.info("form is valid");
    }
    else{
        console.error("form is invalid");
    }

}
function getMember() {
    var options = [];
    function callback(tx, results){

        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlCode += "<li><p>Name: " + row['name'] + "</p>" +
                "<p>Email: " + row['email'] + "</p>" +
                "<p>Birth Date: " + row['age'] + "</p>" +
                "<p>Phone Number: " + row['phone'] + "</p></li>";
        }
        var res = $("#results");
        res = res.html(htmlCode);
        res.listview("refresh");


    }
    SignUp.selectAll(options, callback)
}
function getAuction() {
    var options = [];
    function callback(tx, results){

        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            if (row['MAX(b.bidAmount)'] != null) {
                htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " data-row-highBid=" + row['MAX(b.bidAmount)'] + " data-row-address=" + row['aucLocation'] + " href='#' >" +
                    "<p>Model: " + row['model'] + "</p>" +
                    "<p>Make: " + row['make'] + "</p>" +
                    "<p>Year: " + row['year'] + "</p>" +
                    "<p>Current Highest Bid: " + row['MAX(b.bidAmount)'] + "</p></li>";
            }
            else {
                htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " data-row-highBid=" + row['MAX(b.bidAmount)'] + " data-row-address=" + row['aucLocation'] + " href='#' >" +
                    "<p>Model: " + row['model'] + "</p>" +
                    "<p>Make: " + row['make'] + "</p>" +
                    "<p>Year: " + row['year'] + "</p>" +
                    "<p>Starting Bid: " + row['startingBid'] + "</p>" +
                    "<h2>Be the first to bid!</h2></li>";
            }

        }
        var res = $("#Browser");
        res = res.html(htmlCode);
        res.listview("refresh");

        $("#Browser a").on("click",clickHandler);
        function clickHandler() {
            var id = $(this).attr("data-row-id");
            var highestBid = $(this).attr("data-row-highBid");
            var address = $(this).attr("data-row-address");
            localStorage.setItem("id",id);
            localStorage.setItem("highestBid", highestBid);
            localStorage.setItem("address", address);
            $(location).prop("href","#pageBidders");
        }
    }
    Auction.selectAll(options, callback)
}
function addToNewsLetter() {
    //1. check the validation of the form
    if (doValidate_formSignUp()) {
        console.info("form is valid");
        // 2. if validation is ok fetch the information from the form
        var name = $("#txtName").val();
        var email = $("#txtEmail").val();
        var age = $("#txtAge").val();
        var phone = $("#txtPhone").val();
        // 3. save the information to a table
        var options = [name, email, age, phone];
        function callback(){
            alert("Congratulations your on our Newsletter list!");
        }
        SignUp.insert(options, callback);
    }
    else{
        console.error("form is invalid");
    }
}

function addAuction() {
    //1. check the validation of the form
    if (doValidate_formAuction()) {
        console.info("form is valid");
        // 2. if validation is ok fetch the information from the form
        var model = $("#txtModel").val();
        var make = $("#txtMake").val();
        var year = $("#txtYear").val();
        var damage = $("#txtDamage").val();
        var bid = $("#txtBid").val();
        var name = $("#txtAucName").val();
        var email = $("#txtAucEmail").val();
        var phone = $("#txtAucPhone").val();
        var address = $("#txtAucLocation").val();
        // 3. save the information to a table
        var options = [model,make,year,damage,bid,name, email, phone, address];
        function callback(){
            alert("Congratulations your Vehicle is up for Auction!");
        }
        Auction.insert(options, callback);
    }
    else{
        console.error("form is invalid");
    }
}
function showOneAuction() {

    var id = localStorage.getItem("id");
    var options = [id];
    function callback(tx, results){
        var row = results.rows.item(0);

        $("#txtId").val(row['id']);
        $("#txtBidModel").val(row['model']);
        $("#txtBidMake").val(row['make']);
        $("#txtBidYear").val(row['year']);
        $("#txtBidDamage").val(row['damage']);
        $("#txtStartingBid_Bid").val(row['startingBid']);
    }
    Auction.select(options, callback);
}

function showBids() {
    var id = localStorage.getItem("id");
    var options = [id];
    var htmlCode = "";
    function callback(tx, results) {
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlCode += "<li>" +
                "<p>Bid Amount: " + row['bidAmount'] + "</p>" +
                "<p>Bidder: " + row['bidderName'] + "</p>" +
                "</li>";
        }
        var list = $("#bidList");
        list.html(htmlCode);
        list.listview("refresh");
    }
    Bid.selectAllBids(options, callback);


}

function newBid() {
    var id = $("#txtId").val();
    var bid= $("#txtPlaceBid").val();
    var bidderName = $("#txtBidderName").val();
    var bidderEmail = $("#txtBidderEmail").val();
    var insertOptions = [id, bid, bidderName, bidderEmail];
    var deleteOptions = [id, bidderEmail];
    console.info("Bid Placed ");
    function insertCallback(){
        console.info("Bid Placed successfully");
        alert("Your bid was placed successfully");
    }
    function deleteCallback() {
        console.info("Bid deleted successfully");
    }
    Bid.delete(deleteOptions, deleteCallback);
    Bid.insert(insertOptions, insertCallback);
    $(location).prop("href","#pageBrowse");
}

function TestBid() {
    if (doValidate_formBid()) {
        newBid();
    }
}


