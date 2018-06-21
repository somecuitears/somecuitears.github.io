/* exported Validate */
var isValid = 1;
var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

function NameValidate() {
    var fname = document.forms["jsFormValid"]["fname"];
    if (fname.value === "") {
        DisplayError("nameError", "Please enter your name");
    } else {
        ClearError("nameError");
    }
}

function ZipValidate() {
    var zip = document.forms["jsFormValid"]["zip"];
    if (isNaN(zip.value) || zip.value.length != 5) {
        DisplayError("zipError", "Numeric Value and 6 Digit Required");
    } else {
        ClearError("zipError");
    }
}

function CountryValidate() {
    var country = document.forms["jsFormValid"]["country"];
    if (country.value === "") {
        DisplayError("countryError", "Please Select Value...");
    } else {
        ClearError("countryError");
    }
}

function GenderValidate() {
    var gender = document.forms["jsFormValid"]["gender"];
    if (gender.value === "") {
        DisplayError("genderError", "Please Choose Gender")
    } else {
        ClearError("genderError");
    }
}

function ColorValidate() {
    var noSelected = document.querySelectorAll('input[type="checkbox"]:checked');
    var noSelLent = noSelected.length;
    var preferences = "";
    //Old Style
    /*
    var elements = document.getElementsByName('color'); for (var i = 0; elements[i]; ++i) { if (elements[i].checked) { preferences[index++] = elements[i].value; } } if (preferences.length == 0) { DisplayError("prefError", "Select One or more color."); } else { DisplayError("prefError", ""); }
    */

    if (noSelLent == 0) {
        DisplayError("prefError", "Select One or more color.");
    } else {
        for (var i = 0; i < noSelLent; i++) {
            preferences += noSelected.item(i).value + " ";
        }
        ClearError("prefError");
    }
}

function PhoneValidate() {
    var phone = document.forms["jsFormValid"]["phone"];
    if (isNaN(phone.value) || phone.value.length != 9) {
        DisplayError("phoneError", "Numeric Value and 10 Digit Required");
    } else {
        ClearError("phoneError");
    }
}


function EmailValidate() {
    var email = document.forms["jsFormValid"]["email"];
    var pattern = new RegExp(emailRegex);
    var emailTest = pattern.test(email.value);
    if (!emailTest) {
        DisplayError("emailError", "Enter valid email address");
    } else {
        ClearError("emailError");
    }
}

function PasswordValidation() {
    var password = document.forms["jsFormValid"]["password"];
    var confirmPassword = document.forms["jsFormValid"]["confirmPassword"];
    var p1 = password.value.length;
    var p2 = confirmPassword.value.length;
    if (p1 == 0 || p2 == 0) {

        DisplayError("passError", "Password length must be 6-8 characters");

    } else {
        if (password.value === confirmPassword.value) {
            if (p1 < 5 && p1 > 9 || p2 < 5 && p2 > 9) {
                DisplayError("passError", "Password length must be 6-8 characters");
            } else {
                ClearError("passError");
            }
        } else {

            DisplayError("passError", "Password do not match");
        }
    }

}

function Validate() {
    //var index = 0;
    NameValidate();
    ZipValidate();
    CountryValidate();
    GenderValidate();
    ColorValidate();
    PhoneValidate();
    PasswordValidation();
    EmailValidate();
    var address = document.forms["jsFormValid"]["address"];

    if (isValid != 0) {
        alert("Name: " + fname.value + "\nAddress: " + address.value + "\nZip Code: " + zip.value + "\nCountry: " + country.value + "\nGender: " + gender.value + "\nColor: " + preferences + "\nPhone: " + phone.value + "\nEmail :" + email.value);
    }

}

function Reset() {
    //            var a = document.querySelectorAll("input");
    //            a.forEach(a => {
    //            var fieldtype = a.type.toLowerCase();

    //Clear Input fields
    var selectField = document.getElementsByTagName("select");
    selectField.country.selectedIndex = 0;

    var allElements = document.getElementsByTagName("input");

    for (var i = 0; i < allElements.length; i++) {
        var fieldtype = allElements[i].type.toLowerCase();
        //console.log(fieldtype);
        switch (fieldtype) {
            case "text":
            case "password":
            case "textarea":
                //alert("text");
                allElements[i].value = "";
                break;
            case "radio":
            case "checkbox":
                // alert("box");
                if (allElements[i].checked) {
                    allElements[i].checked = false;
                }
                break;
            case "select":
                //alert("select");
                allElements[i].selectedIndex = 1;
                break;
        }
    }

    //Clear Error msg
    var allSpan = document.getElementsByTagName("span");
    console.log(allSpan);
    for (var i = 0; i < allSpan.length; i++) {
        allSpan[i].innerText = "";
    }

}

function ClearError(id) {
    document.getElementById(id).innerText = "";
    console.log(isValid);
    isValid = 1;
}

function DisplayError(id, message) {
    document.getElementById(id).innerHTML = "<span>" + message + "</span>";
    console.log(isValid);
    isValid = 0;
}
