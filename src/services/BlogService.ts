import { Router } from "express";
import multer from "multer";
import { auth, verifyAdmin, largeLimiter } from "../Middleware";
import { apiAdapter } from "../util/apiAdapter";
import { config }  from '../config';

const upload = multer();
const baseURL = config.blogService;
const api = apiAdapter(baseURL);
const router = Router();

router.get("/blog/health", auth, verifyAdmin, (req, res) => { 
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/createpost", auth, verifyAdmin, upload.any(), (req, res) => { 
  // @ts-ignore 
  const { files }  = req;
  // @ts-ignore  
  const { buffer, originalname: filename } = files[0];

  const formFile = new FormData();
  // @ts-ignore
  formFile.append('file', buffer, { filename });
  api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  
  api.post(req.path, formFile, {}).then(resp => {
    res.send(resp.data);
  });
});

router.get("/blog/posts", auth, largeLimiter, (req, res) => { 
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/editpost", auth, verifyAdmin, (req, res) => {
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/removepost", auth, verifyAdmin, (req, res) => {
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  })
});

export { router as BlogService };
