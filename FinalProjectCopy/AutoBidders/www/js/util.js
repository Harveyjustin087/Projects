/**
 * File Name: util.js
 *
 * Revision History:
 *       Justin Harvey & Morgan Walker, 2020-04-12 : Created
 */
function doValidate_formAuction() {
    var form = $("#formAuction");
    form.validate({
        rules:{
            txtModel:{
                required: true,
                rangelength: [2,30]
            },
            txtMake:{
                required: true,
            },
            txtYear:{
                required: true
            },
            txtDamage:{
                required: true
            },
            txtBid:{
                required: true
            },
            txtAucName:{
                required: true,
                rangelength: [2,30]
            },
            txtAucEmail:{
                required: true,
                email: true
            },
            txtAucPhone:{
                required: true,
                validPhone: true
            },
            txtAucLocation: {
                required: true
            }
        },
        messages:{
            txtModel:{
                required: "The vehicle model is required",
                rangelength: "The vehicle model name must be between 2 and 30 characters"
            },
            txtMake:{
                required: "The vehicle's manufacturer is required",
            },
            txtYear:{
                required: "You must include the vehicle's year"
            },
            txtDamage:{
                required: "Please fill in damages or simply write N/A"
            },
            txtBid:{
                required: "You must include a starting bid for your vehicle"
            },
            txtAucName:{
                required: "You must include your name",
                rangelength: "Your name must be between 2 and 30 characters"
            },
            txtAucEmail:{
                required: "You must include your email",
                email: "You must enter a valid email address"
            },
            txtAucPhone: {
                required: "You must include your phone number",
                validPhone: "You must enter a valid phone number"
            },
            txtAucLocation: {
                required: "You must include the city you are from"
            }
        }
    });
    return form.valid();
}
function doValidate_formSignUp() {
    var form = $("#formSignUp");
    form.validate({
        rules:{
            txtName:{
                required: true,
                rangelength: [2,30]
            },
            txtEmail:{
                required: true,
                email: true
            },
            txtAge:{
                required: true
            },
            txtPhone:{
                required: true,
                validPhone: true
            }
        },
        messages:{
            txtName:{
                required: "You must include your full name",
                rangelength: "Your name must be between 2 and 30 characters"
            },
            txtEmail:{
                required: "You must include your Email",
                email: "You must enter a valid email address"
            },
            txtAge:{
                required: "You must include your age"
            },
            txtPhone:{
                required: "You must include your phone number",
                validPhone: "You must enter a valid phone number"
            }
        }
    });
    return form.valid();
}

function doValidate_formBid() {
    var form = $("#bidForm");
    var highestBid = localStorage.getItem("highestBid");
    var startingBid = $("#txtStartingBid_Bid").val();

    form.validate({
        rules:{
            txtPlaceBid:{
                greaterThanCurrent: true,
                greaterThanStarting: true,
                required: true
            },
            txtBidderName:{
                required: true
            },
            txtBidderEmail:{
                required: true,
                email: true
            }
        },
        messages:{
            txtPlaceBid:{
                greaterThanCurrent: "Bid must be greater than $" + highestBid,
                greaterThanStarting: "Bid must be greater than or equal to the starting bid of $" + startingBid,
                required: "A bid must be provided"
            },
            txtBidderName:{
                required: "A name must be provided"
            },
            txtBidderEmail:{
                required: "An email must be provided",
                email: "Please provide a valid email"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("greaterThanCurrent", function (value, element) {
    var highestBid = localStorage.getItem("highestBid");
    if(highestBid === "null") {
        return true;
    }
    else {
        return value >= highestBid;
    }
},
    "Custom comparison of bid to highest bid"
);

jQuery.validator.addMethod("greaterThanStarting", function (value, element) {
        var startingBid = $("#txtStartingBid_Bid").val();

            return value >= startingBid;
    },
    "Custom comparison of bid to highest bid"
);

jQuery.validator.addMethod("validPhone",
    function (value, element) {
        var regex = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
        return this.optional(element) || regex.test(value);
    },
    "Custom phone number checker"
);

