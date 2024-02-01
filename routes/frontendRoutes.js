// src/routes/frontendRoutes.js
const express = require("express");
const fileController = require("../controllers/fileController");

const router = express.Router();

// Render the upload page
router.get("/", fileController.showUploadPage);

// Render the view QR code page
router.get("/view-qr-code/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  const protocol = req.protocol;
  const host = req.get("host");

  const protoHost = `${protocol}://${host}`;

  try {
    // Fetch QR code data using the generateQRCode function from fileController
    const qrCodeDataUrl = await fileController.generateQRCode(
      protoHost,
      fileId
    );

    const downloadLink = `${protoHost}/api/files/download/${fileId}`;

    console.log(downloadLink);

    // Render the EJS template with the fetched data
    res.render("viewQrCode", { qrCodeDataUrl, downloadLink });
  } catch (error) {
    // Handle errors (e.g., QR code not found)
    console.error(error.message);
    res.render("viewQrCode", { qrCodeDataUrl: null, downloadLink: null });
  }
});

module.exports = router;
