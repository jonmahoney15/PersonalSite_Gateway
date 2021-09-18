import { Router } from "express";
import { auth, verifyAdmin, rateLimiter } from "../Middleware";
import { apiAdapter } from "../util/apiAdapter";
import { config }  from '../config';

const baseURL = config.contactService;
const api = apiAdapter(baseURL);
const router = Router();

router.get("/contact/health", auth, verifyAdmin, (req, res) => { 
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/contact/contact", auth, rateLimiter, (req, res) => {
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  });
});

export { router as ContactService };
