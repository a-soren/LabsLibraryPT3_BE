const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const request = require("request-promise");
const queryString = require("query-string");
// const restricted = require("../../middleware/restricted");
router.use(require("body-parser").text());

router.get("/connect", (req, response) => {
  const stripeData = {
    response_type: "code",
    uri: "https://connect.stripe.com/express/oauth/authorize",
    qs: {
      redirect_uri: "https://localhost:3000/account",
      client_id: "ca_FIasejiINwidFDyzoZ3EZ5Go8GKRfdsO"
    }
  };

  request
    .get(stripeData)
    .then(
      secondRes =>
        secondRes.redirect(
          `${stripeData.uri}?${queryString.stringify(stripeData.qs)}`
        ),
      console.log("redirecting")
    )
    .catch(err => console.log(err));
});

module.exports = router;
