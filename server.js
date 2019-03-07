require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT ? process.env.PORT : 3000;

var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

app.get('/token/:identity', (req, res) => {
    
    var identity;

    if(req.params.identity) {
        identity = req.params.identity;
    }
    else {
        identity = "default-identity";
    }
    
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token
    token.identity = identity;

    //grant the access token Twilio Video capabilities
    var grant = new VideoGrant();

    // grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    res.send({
        identity: identity,
        token: token.toJwt()
    });
})
app.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
})