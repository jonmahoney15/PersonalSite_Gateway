import { Router } from "express";
import { auth, verifyAdmin, largeLimiter } from "../Middleware";
import { apiAdapter } from "../util/apiAdapter";
import { config }  from '../config';

const baseURL = config.blogService;
const api = apiAdapter(baseURL);
const router = Router();

router.get("/blog/health", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/createpost", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  })
});

router.get("/blog/posts", auth, largeLimiter, (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/editpost", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/removepost", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  })
});

export { router as BlogService };
