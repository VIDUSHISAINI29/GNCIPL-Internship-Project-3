import { expressjwt as jwt } from "express-jwt";
import jwksRsa from 'jwks-rsa';

export const verifyToken = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-jn3xtj4ybknohuo4.us.auth0.com/.well-known/jwks.json` // your Auth0 domain + well-known path
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH_AUDIENCE,    // Your API audience configured in Auth0 dashboard
  issuer: process.env.AUTH_DOMAIN,  // Your Auth0 domain
  algorithms: ['RS256']
});
