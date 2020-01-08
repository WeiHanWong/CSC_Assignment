function WebFormDataRegister(inEmail, inPassword, inConfirmPassword) {
    this.Email = inEmail;
    this.Password = inPassword;
    this.ConfirmPassword = inConfirmPassword;
}

$('#Reg').on('click', function () {
    var regObj = {
        "Email": $("#email").val(),
        "Password": $("#pwd").val(),
        "ConfirmPassword": $("#cpwd").val()
    }
    var sendData = JSON.stringify(regObj)
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
    var logObj = "username=" + $("#emaillog").val() + "&password=" + $("#pwdlog").val() + "&grant_type=password"
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
                window.localStorage.setItem("access_token", data["access_token"])
                $("#status").text("Login Success");
                setTimeout(function () { window.location.replace("index.html");},2000)
                
            },
            error: function (data) {
                console.log(data)
                $("#loading-image").hide();
                $("#errBody").show();
                $("#status").text("Login Fail");
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