/*
PROG 2430 Sec. 3
Professor: Sabbir Ahmed
By: Justin Harvey
Created: February 2020
jhglobal.js
email: jharvey7599@conestogac.on.ca
*/
//Function to hide or show the rating div when the checkbox is selected or unselected
function chkCollapse_check() {

   if (!this.checked){
       $("#hideThis").hide();
   }
   else{
       $("#hideThis").show();
   }
}
//Function to hide or show the modified rating div when the checkbox is selected or unselected
function chkModCollapse_check() {

    if (!this.checked){
        $("#hideModify").hide();
    }
    else{
        $("#hideModify").show();
    }
}
//Function to collapse the div for the modified and regular rating textboxes until the check box is checked to show them
function hideThis() {
    $("#hideThis").hide();
    $("#hideModify").hide();
}
// Function that calls the method to calculate the overall rating  on change in one of the rating textboxes
function txtRatingChange() {
    calculateRating();
}
// Function that calls the method to calculate the overall rating  on change in one of the modified rating textboxes
function txtModRatingChange() {
    calculateModifiedRating();
}
// Function that checks the validation of the form on click of the save button
function btnSave_click() {
    checkValidation();
    jhaddFeedback();
}
// Function that checks the validation of the form on click of the update button
function btnUpdate_click() {
    checkUpdateValidation();
    jhUpdateFeedback();
}
// Function that save the textbox value to local storage on click of the save default button
function btnSaveDefault_click() {
    addEmail();
}
// Function that initializes the local storage with its default value
function initLocalStorage() {
    defaultEmail();
}
function initDB() {
    console.info("Creating Database...");
    try{
        DB.JHcreateDatabase();
        if (db){
            console.info("Creating Tables...");
            DB.JHcreateTables();
        }
        else{
            console.info("Error: cannot create tables: Database is not available");
        }
    }
    catch (e) {
        console.error("Error: (FATAL) Error in initDB cannot proceed");
    }
}
function pageAdd_show() {
   defaultAddEmail();
   JHupdateTypesDropDown();
}
function viewFeedbackPage_show() {
    jhGetReviews();
}
function editFeedbackPage_show() {
    JHupdateReviewTypesDropDown();
    jhShowCurrentReview();
}
function btnDelete_click() {
    jhDeleteFeedback();
}
function btnClearDb_click() {
    jhClearDatabase();
    initDB();
}

// Function that applies event handlers on load
function init() {
    console.info("DOM is ready");
    $("#jhAddRating").on("change", chkCollapse_check);
    $("#jhModifyRating").on("change", chkModCollapse_check);
    $("#jhFood").on("change", txtRatingChange);
    $("#jhService").on("change", txtRatingChange);
    $("#jhValue").on("change", txtRatingChange);
    $("#jhModifyFood").on("change", txtModRatingChange);
    $("#jhModifyService").on("change", txtModRatingChange);
    $("#jhModifyValue").on("change", txtModRatingChange);
    $("#jhBtnSave").on("click",btnSave_click);
    $("#jhBtnUpdate").on("click",btnUpdate_click);
    $("#jhSaveDefault").on("click",btnSaveDefault_click);
    $("#jhDelete").on("click",btnDelete_click);
    $("#jhClearDb").on("click",btnClearDb_click);

    $("#jhAddFeedbackPage").on("pageshow",pageAdd_show);
    $("#jhEditFeedbackPage").on("pageshow",editFeedbackPage_show);
    $("#jhViewFeedbackPage").on("pageshow",viewFeedbackPage_show);
}

// calls necessary functions on load
$(document).ready(function () {
    init();
    hideThis();
    initLocalStorage();
    initDB();
});
