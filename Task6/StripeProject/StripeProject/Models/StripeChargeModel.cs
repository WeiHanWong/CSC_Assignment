namespace StripeProject.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class StripeChargeModel
    {
        //API Testing Keys
        //PKey = publishable key, SKey = secret key
        public string PKey { get; } = "pk_test_0IVARsnHxPA0Q91KYIyZXBiX00Dr1xbS0y";
        public static string SKey { get; } = "sk_test_dVjm658ONAh8pNkRvH2iHfWR00S7dGPJI0";

        //save charge id for current transaction
        public string ChargedId { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        [Range(0.01, Double.PositiveInfinity)]
        public double Amount { get; set; }
        // These fields are optional and are not 
        // required for the creation of the token
        public string CardHolderName { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressCity { get; set; }
        public string AddressPostcode { get; set; }
        public string AddressCountry { get; set; }
    }
}