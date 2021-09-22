import { Router } from "express";
import multer from "multer";
import FormData from 'form-data';
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
  }).catch(error => {
    res.status(500).json({Status: "Error", message: error.message})
  });
});

router.post("/blog/createpost", auth, verifyAdmin, upload.single('file'), (req, res) => { 
  console.log("!!!!! in create at gateway !!!!!");
  const file = req.file;
  console.log(file);
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  const formData = new FormData();
  formData.append('Post', JSON.stringify(JSON.parse(req.body.Post)));
  //@ts-ignore 
  formData.append('file', file.buffer, file.originalname);
  api.post(req.path, formData, {
      headers: {
          //@ts-ignore
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
  }).then(resp => {
    res.send(resp.data);
  }).catch(error => {
    res.send({Status: "Error", message: error.message})
  });
});

router.get("/blog/posts", auth, largeLimiter, (req, res) => { 
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.get(req.path).then(resp => {
    res.send(resp.data);
  }).catch(error => {
    res.status(500).json({Status: "Error", message: error.message})
  });
});

router.post("/blog/editpost", auth, verifyAdmin, (req, res) => {
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  }).catch(error => {
    res.status(500).json({Status: "Error", message: error.message})
  });
});

router.post("/blog/removepost", auth, verifyAdmin, (req, res) => {
  api.defaults.headers.common['x-auth-token'] = req.header('x-auth-token');
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  }).catch(error => {
    res.status(500).json({Status: "Error", message: error.message})
  })
});

export { router as BlogService };
