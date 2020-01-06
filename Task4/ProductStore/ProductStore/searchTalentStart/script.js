$('#search').keyup(function () {
    //get data from json file
    //var urlForJson = "data.json";

    //get data from Restful web Service in development environment
    //var urlForJson = "http://localhost:9000/api/talents";

    //get data from Restful web Service in production environment
    var urlForJson = "https://productstoreweihan.azurewebsites.net/ap/talents";

    //Url for the Cloud image hosting
    var urlForCloudImage = "https://res.cloudinary.com/dued3lcpt/image/upload/v1575898585/";

    var searchField = $('#search').val();
    var myExp = new RegExp(searchField, "i");


    $("#loading-image").show();
    function callData() {
        $.getJSON(urlForJson, function (data) {
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
        }).fail(function () {
            $("#failmsg").show();
            $("#ws").text(urlForJson);
            setTimeout(callData, 3000)
        }); //get JSON
    }
    callData();
});