/*
PROG 2430 Sec. 3
Professor: Sabbir Ahmed
By: Justin Harvey
Created: February 2020
jhfacade.js
email: jharvey7599@conestogac.on.ca
*/
// Function to call form validation and pass or fail based on the outcome for the Add a Feedback Page
function checkValidation() {

    if (doValidate_jhAddForm()) {
        console.info("form is valid");
    }
    else{
        console.error("form is invalid");
    }

}
// Function to call form validation and pass or fail based on the outcome for the Modify Feedback Page
function checkUpdateValidation() {

    if (doValidate_jhEditForm()) {
        console.info("form is valid");
    }
    else{
        console.error("form is invalid");
    }

}
// Function to call local storage creation function and initialize it on load
function addEmail() {
    console.info("Creating Database...");
    try{
       createStorage();
       alert("Default reviewer email added to storage")
    }
    catch (e) {
        console.error("Error: (FATAL) Error in adding to storage cannot proceed");
    }
}
// Presents the saved reviews in the view Feedback Page
function jhGetReviews() {
    var options = [];
    function callback(tx, results){

        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);
            console.info("id: " + row['id'] +
                " businessName: " + row['businessName'] +
                " typeId: " + row['typeId'] +
                " reviewerEmail: " + row['reviewerEmail'] +
                " reviewerComments: " + row['reviewerComments'] +
                " reviewDate: " + row['reviewDate'] +
                " hasRating: " + row['hasRating'] +
                " rating1: " + row['rating1'] +
                " rating2: " + row['rating2'] +
                " rating3: " + row['rating3']
            );
            // calculate the overall rating to be shown
            var total = Math.round((row['rating1'] + row['rating2'] + row['rating3']) * 100/15);
            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#' >" +
                "<h1>Business Name: " + row['businessName'] + "</h1>" +
                "<p>Email: " + row['reviewerEmail'] + "</p>" +
                "<p>Comments: " + row['reviewerComments'] + "</p>" +
                "<p>Overall Rating: " + total + "</p>" +
                "</a></li>";
        }
        var lv = $("#jhLVReview");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#jhLVReview a").on("click",clickHandler);
        function clickHandler() {
            var id = $(this).attr("data-row-id");
            localStorage.setItem("id",id);
            $(location).prop("href","#jhEditFeedbackPage");
        }
    }
    Review.JHselectAll(options, callback)
}
function jhShowCurrentReview() {

    var id = localStorage.getItem("id");
    var options = [id];
    function callback(tx, results){
        var row = results.rows.item(0);
        var rating = row['hasRating'];
        var dropDown = $("#cmbReviewType");
        console.info("id: " + row['id'] +
            " rating: " + rating );

        $("#jhBusinessName").val(row['businessName']);
        $("#cmbReviewType").find('option:selected').val(row['typeId']);
        $("#jhReviewerEmail").val(row['reviewerEmail']);
        $("#jhReviewerComments").val(row['reviewerComments']);
        $("#jhReviewDate").val(row['reviewDate']);
        if (rating === 'true'){
            $("#jhModifyRating").prop("checked",true);
            $("#hideModify").show();
        }
        else{
            $("#jhModifyRating").prop("checked",false);
            $("#hideModify").hide();
        }
        $("#jhModifyFood").val(row['rating1']);
        $("#jhModifyService").val(row['rating2']);
        $("#jhModifyValue").val(row['rating3']);
        $("#jhEditForm :checkbox").checkboxradio("refresh");
        dropDown.selectmenu("refresh");
    }
    Review.JHselect(options, callback);
}
function jhDeleteFeedback() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(){
        console.info("Feedback Deleted successfully");
        alert("Feedback deleted successfully");
    }
    Review.JHdelete(options,callback);
    $(location).prop("href","#jhViewFeedbackPage");

}
function jhUpdateFeedback() {
    var id = localStorage.getItem("id");
    var businessName = $("#jhBusinessName").val();
    var typeId = $("#cmbReviewType").val();
    var reviewerEmail = $("#jhReviewerEmail").val();
    var reviewerComments = $("#jhReviewerComments").val();
    var reviewDate = $("#jhReviewDate").val();
    var hasRating = $("#jhModifyRating").prop("checked");
    var rating1 = $("#jhModifyFood").val();
    var rating2 = $("#jhModifyService").val();
    var rating3 = $("#jhModifyValue").val();

    var options = [businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,
        rating1,rating2,rating3,id];
    function callback(){
        console.info("Record Updated successfully");
        alert("Feedback updated successfully");

    }
    Review.JHupdate(options,callback);
    $(location).prop("href","#jhViewFeedbackPage");
}
// Loads the default email into the Add a Feedback reviewer Email textbox
function defaultAddEmail() {
    var email = localStorage.getItem("DefaultEmail")
    $("#jhEmail").attr("value", email);
}
// Creates the values in the combobox on the Add a Feedback Page
function JHupdateTypesDropDown() {
    var options = [];
    function callback(tx, results){

        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);
            console.info("id: " + row['id'] +
                " name: " + row['name']
            );
            htmlCode += "<option value=" + row['id'] + ">" +
                 row['name'] + "</option>";
        }
        var dropDown = $("#cmbType");
        dropDown = dropDown.html(htmlCode);
        dropDown.selectmenu("refresh");
    }
    Type.JHselectAll(options, callback);
}
// Creates the values in the combobox on the Modify a Feedback Page
function JHupdateReviewTypesDropDown() {
    var options = [];
    function callback(tx, results){

        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);
            console.info("id: " + row['id'] +
                " name: " + row['name']
            );
            htmlCode += "<option value=" + row['id'] + ">" +
                row['name'] + "</option>";
        }
        var dropDown = $("#cmbReviewType");
        dropDown = dropDown.html(htmlCode);
        dropDown.selectmenu("refresh");
    }
    Type.JHselectAll(options, callback);
}
function jhaddFeedback() {
//1. check the validation of the form
    if (doValidate_jhAddForm()) {
        console.info("form is valid");
        // 2. if validation is ok fetch the information from the form
        var businessName = $("#jhBusiness").val();
        var typeId = $("#cmbType").val();
        var reviewerEmail = $("#jhEmail").val();
        var reviewerComments= $("#jhComments").val();
        var reviewDate = $("#jhRatingDate").val();
        var hasRating = $("#jhAddRating").prop("checked");
        if (hasRating == true) {
            var rating1 = $("#jhFood").val();
            var rating2 = $("#jhService").val();
            var rating3 = $("#jhValue").val();
        }
        else{
            var rating1 = null;
            var rating2 = null;
            var rating3 = null;
        }
        // 3. save the information to a table
        var options = [businessName, typeId, reviewerEmail, reviewerComments,reviewDate,
        hasRating,rating1,rating2,rating3];
        function callback(){
            alert("New Feedback added successfully");
        }
        Review.JHinsert(options, callback);
    }
    else{
        console.error("form is invalid");
    }
}
function jhClearDatabase() {
    var result = confirm("Do you really want to clear the database?");
    try  {
        if (result){
            Review.JHdropTableReview();
            alert("Database cleared");
        }
    }
    catch(e){
        alert(e);
    }
}
