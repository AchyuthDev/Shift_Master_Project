
var loginVariable = {
    name: "#name",
    email: "#email",
    password: "#txtpassword",
    conformPassword: "#txtConformpassword",
    emailError: "#emailError",
    nameError: "#nameError",
    passwordError: "#passwordError",
    btnRegister: "#btnRegister",

}

$(document).ready(function () {

    /*$(loginVariable.email).focus();*/

    $(loginVariable.name).on('input', function () {
        var name = $(this).val();
        $(loginVariable.InvalidErrorMessage).hide();
        if (!/^[a-z]{1}[a-z]+$/.test(name)) {

            $(loginVariable.nameError).text('Enter a valid name').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
            CheckRegularExpression = false;
        } else {
            $(loginVariable.nameError).hide();
            $(loginVariable.InvalidMessage).hide();
            if (email !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
            }
            CheckRegularExpression = true;
        }
    });

    var CheckRegularExpression = true;
    $(loginVariable.email).on('input', function () {
        var email = $(this).val();
        $(loginVariable.InvalidErrorMessage).hide();
        if (!/^[a-z]{1}[a-z0-9]+@gmail\.com$/.test(email)) {

            $(loginVariable.emailError).text('Enter a valid email address').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
            CheckRegularExpression = false;
        } else {
            $(loginVariable.emailError).hide();
            $(loginVariable.InvalidMessage).hide();
            if (email.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
            }
            CheckRegularExpression = true;
        }
    });
    $(loginVariable.password).on('input', function () {
        var password = $(loginVariable.password).val();
        console.log("password");
        $(loginVariable.InvalidErrorMessage).hide();
        if (!/^[a-z0-9]{4,15}$/.test(password)) { // Check if password length is between 4 and 15 characters
            $(loginVariable.passwordError).text('Password must be between 4 and 15 characters long').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
            CheckRegularExpression = false;
        } else {
            $(loginVariable.passwordError).hide();
            if (password!== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
            }
            CheckRegularExpression = true;
        }
    });

    $(loginVariable.btnRegister).on('click', function (e) {

       
        var UserDetails = {
            Name: $(loginVariable.name).val(), 
            Email: $(loginVariable.email).val(),
            
            Password: $(loginVariable.password).val()
           
            
        }
        console.log("cliked");
        e.preventDefault();
        var isValid = ValidateData();
        if (isValid) {


            $.ajax({

                url: 'https://localhost:7295/api/Account/AddUser',
                type: 'Post',
                contentType: 'application/json', // Set content type to JSON
                data: JSON.stringify(UserDetails), // Convert data to JSON string
              /*  data: UserDetails,*/
                success: function (result) {
                    console.log(result);
                    if (result) {
                        // window.location.href = '/Template/Home';
                    }
                    else {
                        $(loginVariable.InvalidErrorMessage).show();
                        $(loginVariable.email).val('').focus();
                        $(loginVariable.password).val('');

                    }
                },
                error: function () {
                    alert("api error issue");

                }
            });
        }

    });

    function ValidateData() {
        var Email = $(loginVariable.email).val();
        var Password = $(loginVariable.password).val();
        console.log(Email);
        var result = true;
        if (Email == '') {
            $(loginVariable.emailError).text('Plese Enter Email Id').show();
            result = false;
        }
        else {
            if (!/^[a-z]{1}[a-z0-9]+@gmail\.com$/.test(Email)) {
                result = false;

            }
        }
        if (Password == '') {
            $(loginVariable.passwordError).text('Plese Enter password').show();
            result = false;
        }
        else {
            if (!/^[a-z0-9]{4,15}$/.test(Password)) { // Check if password length is between 4 and 15 characters
                result = false;
            }
        }
        return result;
    }
});