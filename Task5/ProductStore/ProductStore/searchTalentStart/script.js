$('#search').keyup(function () {
    //get data from json file
    //var urlForJson = "data.json";

    //get data from Restful web Service in development environment
    var urlForJson = "/api/talents";

    //get data from Restful web Service in production environment
    //var urlForJson = "https://productstoreweihan.azurewebsites.net/api/talents";

    //Url for the Cloud image hosting
    var urlForCloudImage = "https://res.cloudinary.com/dued3lcpt/image/upload/v1575898585/";

    var searchField = $('#search').val();
    var myExp = new RegExp(searchField, "i");

    $("#loading-image").show();
    function callData() {
        $.ajax({
            type: "GET",
            url: urlForJson,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", 'Bearer ' + window.localStorage.getItem("access_token"));
            }
        }).done(function (data) {
            var output = '<ul class="searchresults">';
            $.each(data, function (key, val) {
                //for debug
                console.log(data);
                if ((val.Name.search(myExp) != -1) ||
                    (val.Bio.search(myExp) != -1)) {
                    output += '<li>';
                    output += '<h2>' + val.Name + '</h2>';
                    //get the absolute path for local image
                    //output += '<img src="images/'+ val.ShortName +'_tn.jpg" alt="'+ val.Name +'" />';

                    //get the image from cloud hosting
                    output += '<img src=' + urlForCloudImage + val.ShortName + "_tn.jpg alt=" + val.Name + '" />';
                    output += '<p>' + val.Bio + '</p>';
                    output += '</li>';
                }
            });
            output += '</ul>';
            $('#update').html(output);
            $("#loading-image").hide();
            $("#failmsg").hide();
        }).fail(function (data) {
            $("#failmsg").show();
            $("#ws").text(urlForJson);
            if (data.status) {
                $("#fmsg").text("Unauthorized. Returning to Login...")
                setTimeout(function () { window.location.replace("login.html"); }, 3000)
            }
            setTimeout(callData, 3000)
        });
    }
    callData();
});

$('#logout').on('click', function () {
    window.localStorage.setItem("access_token", "");
    $("#logoutStat").text("Log Out Successful")
    setTimeout(function () { window.location.replace("login.html"); }, 1500)
});