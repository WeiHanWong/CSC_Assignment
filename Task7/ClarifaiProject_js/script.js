$(document).ready(function(){

    // var country = "china";
    // var numOfDays = "5";
    // var key = "cc0e4957de9e41d4a3d71549190912";

    // var Scheme = "https"
    // var Host = "api.worldweatheronline.com";
    // var Path = "premium/v1/weather.ashx";
    // var Query = "q="+ country + "&format=xml&num_of_days="+ numOfDays + "&key=" + key;

    // var conString = Scheme + "://" + Host + "/" + Path + "?" + Query
    // $.ajax({
    //     type: "GET",
    //     url: conString,
    //     dataType: "xml",
    //     contentType: "text/xml",
    //     beforeSend: function () {
    //         $("#loading-image").show();
    //     },
    //     success: function (data) {
    //         $("#conFail").hide();
    //         $("#conSuccess").show();
    //         $("#loading-image").hide();
    //         $("#xml-head").show();
    //         var xmlText = new XMLSerializer().serializeToString(data);
    //         var xmlTextNode = document.createTextNode(xmlText);
    //         document.getElementById('xmlString').innerHTML = xmlTextNode.data
    //         setTimeout(function(){ 
    //             window.open(conString) 
    //             $("#conSuccess").hide(); 
    //             $("#popup").show();
    //         }, 3000);
    //     },
    //     error: function (xhr, status, error) {
    //         $("#loading-image").hide();
    //         $("#conFail").show();
    //         setTimeout(function(){ 
    //             location.reload(); 
    //         }, 5000);
    //     }
    // });
})
$(document).ready(function(){
    var clarifaiApiKey = '9cbaffed9acc4817b1932de694d6722a';
    var workflowId = 'ClarifaiProject';

    var app = new Clarifai.App({
        apiKey: clarifaiApiKey
    });


    function WebFormData(inUrl) {
        this.sendUrl = inUrl;
    }

    var targetImg = null;

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                targetImg = e.target.result
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#uploadBtn').on('click', function () {
        if ($("#pic").val().length > 0) {
            $(".tags-container").show()
            $("#tagBody").empty();
            $('#image').attr('src', targetImg);
            var file_data = $('#pic').prop('files')[0];
            var form_data = new FormData();
            form_data.append('file', file_data);
            function Tagging(){
                app.models.predict(Clarifai.GENERAL_MODEL, {base64: file_data}).then(
                    console.log("done"),
                    function(response) {
                        console.log(response);
                    },
                    function(err) {
                      console.log(err);
                    }
                )
            }
            Tagging();
            
            // function apiCallimg() {
            //     $.ajax({
            //         url: '/Api/Clarifai/GetTagsUpload',
            //         dataType: 'json',
            //         cache: false,
            //         contentType: false,
            //         processData: false,
            //         data: form_data,
            //         type: 'post',
            //         beforeSend: function () {
            //             $("#failmsg").hide();
            //             $("#loading-image").show();
            //         },
            //         success: function (data) {
            //             $("#loading-image").hide();
            //             $tableBodyElement = $('#tagBody');
            //             for (index = 0; index < data.taglist.length; index++) {
            //                 tag = data.taglist[index]
            //                 console.log(tag)
            //                 confidence = data.confidencelist[index]
            //                 $rowElement = $('<tr></tr>')
            //                 $cellElement = $('<td></td>', { text: tag });
            //                 $rowElement.append($cellElement);
            //                 $cellElement = $('<td></td>', { text: confidence });
            //                 $rowElement.append($cellElement);
            //                 $tableBodyElement.append($rowElement);
            //             }
            //         },
            //         error: function (data) {
            //             $("#loading-image").hide();
            //             $("#failmsg").show();
            //             setTimeout(apiCallimg, 3000);
            //         }
            //     });
            // }
            // apiCallimg();
        }
    });

    $("#submitBtn").on("click", function () {
        if ($("#imageUrl").val().length > 0) {
            $(".tags-container").show()

            $("#tagBody").empty();

            var theurl = $("#imageUrl").val()
            $("#image").attr("src", theurl)

            function Tagging(){
                app.models.predict(Clarifai.GENERAL_MODEL, {url : theurl}).then(
                    function(response) {
                        console.log(response);
                    }
                )
            }

            // var webFormData = new WebFormData(url);

            // var webFormDataInString = JSON.stringify(webFormData);


            // function apiCallweb() {
            //     var $loadTagsHandler = jQuery.ajax({
            //         type: 'POST',
            //         url: '/Api/Clarifai/GetTags',
            //         dataType: 'json',
            //         contentType: 'application/json',
            //         data: "'" + webFormDataInString + "'",
            //         beforeSend: function () {
            //             $("#failmsg").hide();
            //             $("#loading-image").show();
            //         }
            //     });

            //     var tag = '';
            //     var confidence = '';

            //     $loadTagsHandler.done(function (data, textStatus, jqXHR) {
            //         $("#loading-image").hide();
            //         $tableBodyElement = $('#tagBody');
            //         for (index = 0; index < data.taglist.length; index++) {
            //             tag = data.taglist[index]
            //             console.log(tag)
            //             confidence = data.confidencelist[index]
            //             $rowElement = $('<tr></tr>')
            //             $cellElement = $('<td></td>', { text: tag });
            //             $rowElement.append($cellElement);
            //             $cellElement = $('<td></td>', { text: confidence });
            //             $rowElement.append($cellElement);
            //             $tableBodyElement.append($rowElement);
            //         }
            //     });

            //     $loadTagsHandler.fail(function (data, textStatus, jqXHR) {
            //         $("#loading-image").hide();
            //         $("#failmsg").show();
            //         setTimeout(apiCallweb, 3000);
            //     });

            // }
            // apiCallweb();
        }
    })

    function getFormattedString(output) {
        var formattedString = "";
        var data = output.data;
        var maxItems = 3;
        // General
        if (output.model.model_version.id === "aa9ca48295b37401f8af92ad1af0d91d") {
        var items = data.concepts;
        if (items.length < maxItems) {
            maxItems = items.length;
            if (maxItems === 1) {
            formattedString = "The thing we are most confident in detecting is:";
            }
        } else {
            formattedString = "The " + maxItems + " things we are most confident in detecting are:";
        }
    
        for (var i = 0; i < maxItems; i++) {
            formattedString += "<br/>- " + items[i].name + " at a " + (Math.round(items[i].value * 10000) / 100) + "% probability";
        }
        } 
        return formattedString;
    }
});

