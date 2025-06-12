import express from "express";
import {deleteReview, getAllReviews, PostReview} from "../controller/review.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/post-review",verifyToken,PostReview)
router.get("/get-review/:userID",verifyToken,getAllReviews)
router.delete("/delete-review/:id",deleteReview)

export default router;