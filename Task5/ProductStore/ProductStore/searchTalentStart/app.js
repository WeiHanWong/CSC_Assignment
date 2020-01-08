//functions for login.html

$('#Reg').on('click', function () {
    //Create json object
    var regObj = {
        "Email": $("#email").val(),
        "Password": $("#pwd").val(),
        "ConfirmPassword": $("#cpwd").val()
    }
    var sendData = JSON.stringify(regObj)

    //Register
    function RegAPI() {
        $.ajax({
            url: '/api/Account/Register',
            contentType: "application/json",
            data: sendData,
            type: 'post',
            beforeSend: function () {
                $("#failmsg").hide();
                $("#loading-image").show();
                $("#errorMsg").empty();
                $("#errBody").hide();
                $("#status").text("");
            },
            success: function (data) {
                console.log(data)
                $("#loading-image").hide();
                $("#status").text("Registration Success");
            },
            error: function (data) {
                $("#loading-image").hide();
                $("#errBody").show();
                $("#status").text("Registration Fail");

                //Show model validation errors when fail
                try {
                    var state = data.responseJSON.ModelState

                    $libody = $("#errorMsg")
                    for (var key in state) {
                        $cellElement = $('<li></li>', { text: state[key][0] });
                        console.log(state[key][0]);
                        $libody.append($cellElement);
                    }
                } catch (err) {}
                
            }
        });
    }
    RegAPI();
});

$('#Logi').on('click', function () {
    //Plain text for retrieving token
    var logObj = "username=" + $("#emaillog").val() + "&password=" + $("#pwdlog").val() + "&grant_type=password"

    //Retrieve token
    function LogAPI() {
        $.ajax({
            url: '/token',
            contentType: "text/plain",
            data: logObj,
            type: 'post',
            beforeSend: function () {
                $("#failmsg").hide();
                $("#loading-image").show();
                $("#errorMsg").empty();
                $("#errBody").hide();
                $("#status").text("");
            },
            success: function (data) {

                //Set token in localStorage (sessionStorage can also be use)
                window.localStorage.setItem("access_token", data["access_token"])
                $("#status").text("Login Success");

                //Redirect to talent search
                setTimeout(function () { window.location.replace("index.html");},2000)
            },
            error: function (data) {
                console.log(data)
                $("#loading-image").hide();
                $("#errBody").show();
                $("#status").text("Login Fail");

                //Show error description when fail
                try {
                    var state = data.responseJSON.error_description

                    $libody = $("#errorMsg")
                    $cellElement = $('<li></li>', { text: state });
                    $libody.append($cellElement);
                } catch (err) {
                }

            }
        });
    }
    LogAPI();
});