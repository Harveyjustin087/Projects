/*
PROG 2430 Sec. 3
Professor: Sabbir Ahmed
By: Justin Harvey
Created: February 2020
jhutil.js
email: jharvey7599@conestogac.on.ca
*/
// calculate the rating  for the overall rating in the Add a Feedback Page
function calculateRating() {
    var rateFood = $("#jhFood").val();
    var rateService = $("#jhService").val();
    var rateValue = $("#jhValue").val();


    var quality = Number(rateFood);
    var service = Number(rateService);
    var value = Number(rateValue);
    var overall = ((quality + service + value) * 100/15);
    var rounded = Math.round(overall);
    var complete = rounded + "%";
    $("#jhRating").val(complete);
}
// calculate the rating  for the overall rating in the Modify Feedback Page
function calculateModifiedRating() {
    var rateFood = $("#jhModifyFood").val();
    var rateService = $("#jhModifyService").val();
    var rateValue = $("#jhModifyValue").val();


    var quality = Number(rateFood);
    var service = Number(rateService);
    var value = Number(rateValue);
    var overall = ((quality + service + value) * 100/15);
    var rounded = Math.round(overall);
    var complete = rounded + "%";
    $("#jhModifyOverallRating").val(complete);
}
// Function for validating the form in the Add a Feedback page and present error messages
function doValidate_jhAddForm() {
    var form = $("#jhAddForm");
    form.validate({
        rules:{
            jhBusiness:{
                required: true,
                rangelength: [2,30]
            },
            jhEmail:{
                required: true,
                email: true
            },
            jhRatingDate:{
                required: true
            },
            jhFood:{
                ratingcheckquality: true
            },
            jhService:{
                ratingcheckservice: true
            },
            jhValue:{
                ratingcheckvalue: true
            }
        },
        messages:{
            jhBusiness:{
                required: "The business name is required",
                rangelength: "The business name must be between 2 and 30 characters"
            },
            jhEmail:{
                required: "The email is required",
                email: "Must be a valid email"
            },
            jhRatingDate:{
                required: "The rating date is required"
            },
            jhFood:{
                ratingcheckquality: "The quality rating must be between 5 and 0"
            },
            jhService:{
                ratingcheckservice: "The service rating must be between 5 and 0"
            },
            jhValue:{
                ratingcheckvalue: "The value rating must be between 5 and 0"
            }
        }
    });
    return form.valid();
}
// Function to add the method for checking the input of the food quality textbox is valid
jQuery.validator.addMethod("ratingcheckquality",
    function (value, element) {
        var quality = $("#jhFood").val();
        if ($('#jhAddRating').is(":checked")){
            if (quality < 0 || quality> 5){
                return false;
            }
            else{
                return  true;
            }
        }
    },
    "custom checker for food quality"
);
// Function to add the method for checking the input of the service textbox is valid
jQuery.validator.addMethod("ratingcheckservice",
function (value, element) {
    var service = $("#jhService").val();
    if ($('#jhAddRating').is(":checked")){
            if (service > 5 || service < 0 ){
               return  false;
            }
            else{
                return true;
            }
    }
    else{
        return true;
    }
},
    "custom checker for service"
);
// Function to add the method for checking the input of the value textbox is valid
jQuery.validator.addMethod("ratingcheckvalue",
    function (value, element) {
        var overallValue = $("#jhValue").val();
        if ($('#jhAddRating').is(":checked")){
            if (overallValue > 5 || overallValue < 0 ){
                return  false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    },
    "custom checker for service"
);
// Function for validating the form in the Modify Feedback page and present error messages
function doValidate_jhEditForm() {
    var form = $("#jhEditForm");
    form.validate({
        rules:{
            jhBusinessName:{
                required: true,
                rangelength: [2,30]
            },
            jhReviewerEmail:{
                required: true,
                email: true
            },
            jhReviewDate:{
                required: true
            },
            jhModifyFood:{
                checkquality: true
            },
            jhModifyService:{
                checkservice: true
            },
            jhModifyValue:{
                checkvalue: true
            }
        },
        messages:{
            jhBusinessName:{
                required: "The business name is required",
                rangelength: "The business name must be between 2 and 30 characters"
            },
            jhReviewerEmail:{
                required: "The email is required",
                email: "Must be a valid email"
            },
            JHReviewDate:{
                required: "The rating date is required"
            },
            jhModifyFood:{
                checkquality: "The quality rating must be between 5 and 0"
            },
            jhModifyService:{
                checkservice: "The service rating must be between 5 and 0"
            },
            jhModifyValue:{
                checkvalue: "The value rating must be between 5 and 0"
            }
        }
    });
    return form.valid();
}
// Function to add the method for checking the input of the modified food quality textbox is valid
jQuery.validator.addMethod("checkquality",
    function (value, element) {
        var quality = $("#jhModifyFood").val();
        if ($('#jhModifyRating').is(":checked")){
            if (quality < 0 || quality> 5){
                return false;
            }
            else{
                return  true;
            }
        }
    },
    "custom checker for food quality"
);
// Function to add the method for checking the input of the modified service textbox is valid
jQuery.validator.addMethod("checkservice",
    function (value, element) {
        var service = $("#jhModifyService").val();
        if ($('#jhModifyRating').is(":checked")){
            if (service > 5 || service < 0 ){
                return  false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    },
    "custom checker for service"
);
// Function to add the method for checking the input of the modified value textbox is valid
jQuery.validator.addMethod("checkvalue",
    function (value, element) {
        var modValue = $("#jhModifyValue").val();
        if ($('#jhModifyRating').is(":checked")){
            if (modValue > 5 || modValue < 0 ){
                return  false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    },
    "custom checker for service"
);
