using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Clarifai.API;
using Clarifai.DTOs.Inputs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ClarifaiProject.APIs
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ClarifaiController : ControllerBase
    {
        [HttpPost]
        public IActionResult GetTags([FromBody] string value)
        {
            List<object> tagList = new List<object>();
            List<object> confidenceList = new List<object>();
            var clarifaiInput = JsonConvert.DeserializeObject<dynamic>(value);
            var url = clarifaiInput.sendUrl.Value;

            var client = new ClarifaiClient("9cbaffed9acc4817b1932de694d6722a");

            var res = client.PublicModels.GeneralModel
               .Predict(new ClarifaiURLImage(url))
               .ExecuteAsync()
               .Result;

            foreach (var concept in res.Get().Data)
            {
                tagList.Add($"{concept.Name}");
                confidenceList.Add($"{concept.Value}");
            }

            return Ok( new { 
                taglist = tagList,
                confidencelist = confidenceList
            });
        }

        [HttpPost]
        public IActionResult GetTagsUpload(IFormFile file)
        {
            List<object> tagList = new List<object>();
            List<object> confidenceList = new List<object>();

            if (file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    string s = Convert.ToBase64String(fileBytes);

                    var client = new ClarifaiClient("9cbaffed9acc4817b1932de694d6722a");

                    var res = client.PublicModels.GeneralModel
                       .Predict(new ClarifaiFileImage(fileBytes))
                       .ExecuteAsync()
                       .Result;

                    foreach (var concept in res.Get().Data)
                    {
                        tagList.Add($"{concept.Name}");
                        confidenceList.Add($"{concept.Value}");
                    }

                    return Ok(new
                    {
                        taglist = tagList,
                        confidencelist = confidenceList
                    });
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}