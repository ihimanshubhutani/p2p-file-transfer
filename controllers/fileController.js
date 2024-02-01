const { v4: uuidv4 } = require("uuid");
const qrCode = require("qrcode");

// In-memory storage for active connections
const activeConnections = {};

async function uploadFile(req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileId = uuidv4();
  const peerId = req.file.fieldname;

  activeConnections[fileId] = {
    data: file.buffer,
    fileName: file.originalname,
    fileSize: file.size,
    peerId,
  };

  const protocol = req.protocol;
  const host = req.get("host");

  const protoHost = `${protocol}://${host}`;

  const qrCodeDataUrl = await generateQRCode(protoHost, fileId);

  const fileUrl = `/api/files/download/${fileId}`;

  res.json({
    fileId,
    fileUrl,
    qrCode: qrCodeDataUrl,
    fileName: file.originalname,
    fileSize: file.size,
  });
}

function downloadFile(req, res) {
  const fileId = req.params.fileId;

  if (!activeConnections[fileId]) {
    return res.status(404).json({ error: "File not found" });
  }

  const file = activeConnections[fileId];

  res.setHeader("Content-Disposition", `attachment; filename=${file.fileName}`);
  res.send(file.data);
}

async function generateQRCode(host, fileId) {
  const data = `${host}/api/files/download/${fileId}`;
  const qrCodeDataUrl = await qrCode.toDataURL(data);
  return qrCodeDataUrl;
}

function showUploadPage(req, res) {
  res.render("upload");
}

function download(fileId) {
  if (!activeConnections[fileId]) {
    return res.status(404).json({ error: "File not found" });
  }

  const file = activeConnections[fileId];

  return file.data;
}

module.exports = {
  uploadFile,
  downloadFile,
  showUploadPage,
  generateQRCode,
  download,
};
