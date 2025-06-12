import express from "express";
import {PostReview} from "../controller/review.cpntroller.js";
const router = express.Router();

router.post("/post-review",PostReview)

export default router;