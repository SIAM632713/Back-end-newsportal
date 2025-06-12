import express from "express";
import {getAllReviews, PostReview} from "../controller/review.cpntroller.js";
import {verifyToken} from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/post-review",verifyToken,PostReview)
router.get("/get-review/:userID",verifyToken,getAllReviews)

export default router;