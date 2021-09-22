import { Router } from "express";
import { auth, verifyAdmin } from "../Middleware";
import { AuthService } from "../services/AuthService";
import { BlogService } from "../services/BlogService";
import { ContactService } from "../services/ContactService";

const router = Router();

router.get("/health", auth, verifyAdmin, (req, res) =>
  res.status(200).json({ Status: "Success", message: "Gateway is Healthy" })
);

router.use(AuthService);
router.use(BlogService);
router.use(ContactService);

router.get('*', (req, res) => {
  res.status(404).json({Status: 'Failure', message: 'Route does not exist'});
});

export { router as Router };
