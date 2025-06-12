import express from "express";
import {adminState} from "../controller/state.controller.js";

const router = express.Router();

router.get("/admin-state",adminState)

export default router