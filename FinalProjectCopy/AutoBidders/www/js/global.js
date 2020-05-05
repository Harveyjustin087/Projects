/**
 * File Name: global.js
 *
 *       Justin Harvey & Morgan Walker, 2020-04-11 : Created
 */
function initDB() {
    console.info("Creating Database...");
    try{
        DB.createDatabase();
        if (db){
            console.info("Creating Tables...");
            DB.createTables();
        }
        else{
            console.info("Error: cannot create tables: Database is not available");
        }
    }
    catch (e) {
        console.error("Error: (FATAL) Error in initDB cannot proceed");
    }
}
function btnTakePic_click() {
    TakePhoto();
}
function btnLoad_click() {
    loadExisting();
}
function btnSubmit_click() {
    checkValidation();
    addAuction();
}
function btnSignUp_click() {
    checkSignUpValidation();
    addToNewsLetter();

}
function joinedPage_show() {
    getMember();
}
function browsePage_show() {
    getAuction();
}
function biddersPage_show() {
    showOneAuction();
    showBids();
    var address = localStorage.getItem("address");
    document.getElementById('bidMap').innerHTML = "";
    showMap(address);
}

function btnPlaceBid_click() {
    TestBid();

}
function init() {
    $("#btnTakePic").on("click", btnTakePic_click);
    $("#btnLoad").on("click", btnLoad_click);
    $("#btnSubmit").on("click", btnSubmit_click);
    $("#btnSignUp").on("click", btnSignUp_click);
    $("#pageJoined").on("pageshow", joinedPage_show);
    $("#pageBrowse").on("pageshow", browsePage_show);
    $("#pageBidders").on("pageshow", biddersPage_show);
    $("#btnFinalBid").on("click", btnPlaceBid_click);
}
// calls necessary functions on load
$(document).ready(function () {
    init();
    initDB();
});

