// src/routes/fileRoutes.js

const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// File upload  route
router.post("/upload", upload.single("file"), fileController.uploadFile);

// File download route
router.get("/download/:fileId", fileController.downloadFile);

module.exports = router;
