$(document).ready(function(){

    //Query values
    var country = "china";
    var numOfDays = "5";
    var key = "cc0e4957de9e41d4a3d71549190912";

    //Url Builder
    var Scheme = "http"
    var Host = "api.worldweatheronline.com";
    var Path = "premium/v1/weather.ashx";
    var Query = "q="+ country + "&format=xml&num_of_days="+ numOfDays + "&key=" + key;

    //XML data url from world weather online
    var conString = Scheme + "://" + Host + "/" + Path + "?" + Query

    //ajax request
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

            //Display unformatted XML
            var xmlText = new XMLSerializer().serializeToString(data);
            var xmlTextNode = document.createTextNode(xmlText);
            document.getElementById('xmlString').innerHTML = xmlTextNode.data

            //redirect to http://api.worldweatheronline.com for formatted XML view
            setTimeout(function(){ 
                window.open(conString) 
                $("#conSuccess").hide(); 
                $("#popup").show();
            }, 5000);
        },
        error: function (xhr, status, error) {
            $("#loading-image").hide();
            $("#conFail").show();

            //Resend Ajax Request on API Fail
            setTimeout(function(){ 
                location.reload(); 
            }, 5000);
        }
    });
})