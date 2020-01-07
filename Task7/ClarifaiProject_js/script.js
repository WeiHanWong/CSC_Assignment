/*
  Purpose: Pass information to other helper functions after a user clicks 'Predict'
  Args:
    value - Actual filename or URL
    source - 'url' or 'file'
*/
function predict_click(value, source) {
    if(source === "url") {
      document.getElementById("img_preview").src = value;
      doPredict({ url: value });
    }
      
    else if(source === "file") {
      var preview = document.querySelector("#img_preview");
      var file    = document.querySelector("input[type=file]").files[0];
      var reader  = new FileReader();
  
      // load local file picture
      reader.addEventListener("load", function () {
        preview.src = reader.result;
        var localBase64 = reader.result.split("base64,")[1];
        doPredict({ base64: localBase64 });
      }, false);
  
      if (file) {
        reader.readAsDataURL(file);
      }
    } 
  }
  
  function doPredict(value) {
      $("#failmsg").hide();
      $("#loading-image").show();
  
      var modelID = Clarifai.GENERAL_MODEL;
  
      $(".tags-container").show()
      $("#tagBody").empty();
      app.models.predict(modelID, value).then(
      function(response) {
          $("#loading-image").hide();
          var tagsResult = response.rawData.outputs[0].data.concepts;
          $('.tags-container').show();
          $tableBodyElement = $('#tagBody');
          for (index = 0; index < tagsResult.length; index++) {
              tag = tagsResult[index]
              $rowElement = $('<tr></tr>')
              $cellElement = $('<td></td>', { text: tag.name });
              $rowElement.append($cellElement);
              $cellElement = $('<td></td>', { text: tag.value });
              $rowElement.append($cellElement);
              $tableBodyElement.append($rowElement);
          }
      },
      function(err) {
          console.log(err)
          $("#loading-image").hide();
          $("#failmsg").show();
          setTimeout(function(){
              doPredict(value)
          },3000)
      });
  }