import express from "express";
import {createArticlepost} from "../controller/article.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyAdmin} from "../middleware/verifyAdmin.js";
const router = express.Router();

router.post("/creat-post",verifyToken,verifyAdmin,createArticlepost)

export default router;