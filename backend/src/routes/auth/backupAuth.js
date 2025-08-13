import express from "express";
import {Router} from "express";

import dotenv from "dotenv"
import {auth} from 'express-openid-connect';
import pkg from 'express-openid-connect';
dotenv.config();

const {requiresAuth} = pkg
const router = Router()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_CLIENT_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_DOMAIN_ID
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));


router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// req.oidc.isAuthenticated() is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
export default router;