import express from 'express'
import fetch from "node-fetch";
import places from '../controllers/placesController.js';
import chat from '../controllers/chatController.js';

const router = express.Router();

router.get("/location", places);

router.post("/chat", chat);

export default router