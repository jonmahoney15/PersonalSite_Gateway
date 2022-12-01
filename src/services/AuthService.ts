import { Router } from "express";
import { auth, verifyAdmin, rateLimiter } from "../Middleware";
import { apiAdapter } from "../util/apiAdapter";
import { config }  from '../config';

const baseURL = config.authService;
const api = apiAdapter(baseURL);
const router = Router();

router.post("/auth/login", auth, rateLimiter, (req, res) => {
  const authToken?: string | number | boolean = req.header('x-auth-token');
  api.defaults.headers.common['x-auth-token'] = authToken;
  
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  });
});

router.post("/auth/register", auth, verifyAdmin, (req, res) => {
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  });
});

router.get("/auth/token", (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

export { router as AuthService };
