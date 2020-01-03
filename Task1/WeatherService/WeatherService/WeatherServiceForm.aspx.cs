﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

namespace WeatherService
{
    public partial class WeatherServiceForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            XmlDocument wsResponseXmlDoc = new XmlDocument();

            //http://api.worldweatheronline.com/premium/v1/weather.ashx?key=****&q=London&format=xml&num_of_days=5

            //Assign values for query
            var country = "china";
            var numOfDays = "5";
            var key = "cc0e4957de9e41d4a3d71549190912";

            UriBuilder url = new UriBuilder();
            url.Scheme = "http";

            url.Host = "api.worldweatheronline.com";
            url.Path = "premium/v1/weather.ashx";
            url.Query = "q="+ country + "&format=xml&num_of_days="+ numOfDays + "&key=" + key;

            //Make a HTTP request to the global weather web service
            wsResponseXmlDoc = MakeRequest(url.ToString());
            if (wsResponseXmlDoc != null)
            {
                //display the XML response for user
                String xmlString = wsResponseXmlDoc.InnerXml;
                Response.ContentType = "text/xml";
                Response.Write(xmlString);

                // Save the document to a file and auto-indent the output.
                XmlTextWriter writer = new XmlTextWriter(Server.MapPath("xmlweather.xml"), null);
                writer.Formatting = Formatting.Indented;
                wsResponseXmlDoc.Save(writer);

                writer.Close();
            }
            else
            {
                Response.ContentType = "text/html";
                Response.Write("<h2> error  accessing web service </h2>");
                Response.Write("<p>Please check if your API key is incorrect: " + key + "</p>");
                Response.Write("<p>Please check if your country spelled incorrectly: " + country + "</p>");
                Response.Write("<p>Please check if your number of days is in integer form: " + numOfDays + "</p>");
                Response.Write("<b>Rectify and re-run the project</b>");
                Response.End();
            }

        }

        public static XmlDocument MakeRequest(string requestUrl)
        {
            try
            {
                HttpWebRequest request = WebRequest.Create(requestUrl) as HttpWebRequest;
                request.Timeout = 15 * 1000;
                request.KeepAlive = false;
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load(response.GetResponseStream());
                return xmlDoc;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}