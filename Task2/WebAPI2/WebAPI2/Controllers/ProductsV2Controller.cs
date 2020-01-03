using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    public class ProductsV2Controller : ApiController
    {
        static readonly IProductRepository repository = new ProductRepository();

        [HttpGet]
        [Route("api/V2/products")]
        public IEnumerable<Product> GetAllProducts()
        {
            return repository.GetAll();
        }

        [HttpGet]
        [Route("api/v2/products/{id:int:min(1)}", Name = "getProductById")]
        public HttpResponseMessage GetProduct(int id)
        {
            Product item = repository.Get(id);
            if (item == null)
            {
                var errResponse = Request.CreateResponse(HttpStatusCode.BadRequest);
                errResponse.Content = new StringContent("No Product Id Found: " + id, System.Text.Encoding.UTF8, "text/plain");
                return errResponse;
            }
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(item), System.Text.Encoding.UTF8, "application/json");
            return response;
        }

        [HttpGet]
        [Route("api/v2/products", Name = "getProductByCategory")]
        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            return repository.GetAll().Where(
                p => string.Equals(p.Category, category, StringComparison.OrdinalIgnoreCase));
        }

        [HttpPost]
        [Route("api/v2/products")]
        public HttpResponseMessage PostProduct(Product item)
        {
            item = repository.Add(item);
            var response = Request.CreateResponse<Product>(HttpStatusCode.Created, item);

            string uri = Url.Link("getProductById", new { id = item.Id });
            response.Headers.Location = new Uri(uri);
            return response;
        }

        [HttpPut]
        [Route("api/v2/products/{id:int}")]
        public HttpResponseMessage PutProduct(int id, Product product)
        {
            product.Id = id;
            if (!repository.Update(product))
            {
                var errResponse = Request.CreateResponse(HttpStatusCode.BadRequest);
                errResponse.Content = new StringContent("No Product Id Found: " + id, System.Text.Encoding.UTF8, "text/plain");
                return errResponse;
            }

            //Demo Purpose
            var response = Request.CreateResponse<Product>(HttpStatusCode.OK, product);

            string uri = Url.Link("getProductById", new { id = id });
            response.Headers.Location = new Uri(uri);
            return response;
        }

        [HttpDelete]
        [Route("api/v2/products/{id:int}")]
        public HttpResponseMessage DeleteProduct(int id)
        {
            Product item = repository.Get(id);
            if (item == null)
            {
                var errResponse = Request.CreateResponse(HttpStatusCode.BadRequest);
                errResponse.Content = new StringContent("No Product Id Found: " + id, System.Text.Encoding.UTF8, "text/plain");
                return errResponse;
            }
            repository.Remove(id);
            //Demo Purpose
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(repository.GetAll()), System.Text.Encoding.UTF8, "application/json");
            return response;
        }
    }
}
