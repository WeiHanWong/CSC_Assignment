using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProductStore.Models;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace ProductStore.Controllers
{
    [Authorize] //Secure Talents API with Authentication
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TalentsController : ApiController
    {
        static readonly TalentRepository repository = new TalentRepository();

        
        [Route("api/talents")]
        public IEnumerable<Talent> GetAllTalents()
        {
            return repository.GetAll();
        }

        [Route("api/talents/{id:int}")]
        public HttpResponseMessage GetTalent(int id)
        {
            Talent item = repository.Get(id);
            if (item == null)
            {
                var errResponse = Request.CreateResponse(HttpStatusCode.BadRequest);
                errResponse.Content = new StringContent("No Talent Id Found: " + id, System.Text.Encoding.UTF8, "text/plain");
                return errResponse;
            }
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(item), System.Text.Encoding.UTF8, "application/json");
            return response;
        }
    }
}
