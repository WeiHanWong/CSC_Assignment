$(document).ready(function(){

    var country = "china";
    var numOfDays = "5";
    var key = "cc0e4957de9e41d4a3d71549190912";

    var Scheme = "https"
    var Host = "api.worldweatheronline.com";
    var Path = "premium/v1/weather.ashx";
    var Query = "q="+ country + "&format=xml&num_of_days="+ numOfDays + "&key=" + key;

    var conString = Scheme + "://" + Host + "/" + Path + "?" + Query
    $.ajax({
        type: "GET",
        url: conString,
        dataType: "xml",
        contentType: "text/xml",
        beforeSend: function () {
            $("#loading-image").show();
        },
        success: function (data) {
            $("#conFail").hide();
            $("#conSuccess").show();
            $("#loading-image").hide();
            $("#xml-head").show();
            var xmlText = new XMLSerializer().serializeToString(data);
            var xmlTextNode = document.createTextNode(xmlText);
            document.getElementById('xmlString').innerHTML = xmlTextNode.data
            setTimeout(function(){ 
                window.open(conString) 
                $("#conSuccess").hide(); 
                $("#popup").show();
            }, 3000);
        },
        error: function (xhr, status, error) {
            $("#loading-image").hide();
            $("#conFail").show();
            setTimeout(function(){ 
                location.reload(); 
            }, 5000);
        }
    });
})