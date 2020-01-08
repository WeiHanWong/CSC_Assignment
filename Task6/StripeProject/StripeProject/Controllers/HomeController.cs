﻿using System.Web.Mvc;

namespace StripeProject.Controllers
{
    using System.Threading.Tasks;
    using Models;
    using Stripe;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Success(StripeChargeModel model)
        {
            return View(model);
        }

        public ActionResult Charge()
        {
            ViewBag.Message = "Learn how to process payments with Stripe";

            return View(new StripeChargeModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Charge(StripeChargeModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            //Stripe Charge Service
            var chargeId = await ProcessPayment(model);

            model.ChargedId = chargeId;

            return RedirectToAction("Success", model);
        }

        private async Task<string> ProcessPayment(StripeChargeModel model)
        {
            return await Task.Run(() =>
            {
                var myCharge = new StripeChargeCreateOptions
                {
                    // convert the amount of £12.50 to pennies i.e. 1250
                    Amount = (int)(model.Amount * 100),
                    Currency = "sgd",
                    Description = "Description for test charge",
                    Source = new StripeSourceOptions
                    {
                        TokenId = model.Token
                    }
                };

                var chargeService = new StripeChargeService(StripeChargeModel.SKey);
                var stripeCharge = chargeService.Create(myCharge);

                return stripeCharge.Id;
            });
        }
    }
}