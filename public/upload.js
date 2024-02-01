const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const qrCodeContainer = document.getElementById("qrCodeContainer");
const qrCodeImage = document.getElementById("qrCodeImage");
const uploadForm = document.getElementById("uploadForm");
const viewQrCodeButton = document.getElementById("viewQrCode");

let currentFileId = "";

dropArea.addEventListener("dragover", handleDragOver);
dropArea.addEventListener("dragleave", handleDragLeave);
dropArea.addEventListener("drop", handleDrop);
fileInput.addEventListener("change", handleFileChange);

viewQrCodeButton.addEventListener("click", () => {
  window.location.href = `/view-qr-code/${currentFileId}`;
});

function handleDragOver(event) {
  event.preventDefault();
  dropArea.style.backgroundColor = "#f0f0f0";
}

function handleDragLeave(event) {
  event.preventDefault();
  dropArea.style.backgroundColor = "";
}

function handleDrop(event) {
  event.preventDefault();
  dropArea.style.backgroundColor = ""; // Reset background color

  const files = event.dataTransfer.files;
  console.log("Dropped files:", files);

  if (files.length > 0) {
    const formData = new FormData();
    formData.append("file", files[0]);

    // Call handleFileUpload with the FormData object
    handleFileUpload(formData);
  }
}

function handleFileChange(event) {
  const files = event.target.files;
  if (files.length > 0) {
    const formData = new FormData(); // Create a new FormData object
    formData.append("file", files[0]); // Append the file to FormData
    handleFileUpload(formData);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  handleFileUpload();
}

function handleFileUpload(formData) {
  fetch("/api/files/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the uploaded file information
      const fileUploadSection = document.getElementById("fileUploadSection");
      const uploadedFilename = document.getElementById("uploadedFilename");
      const uploadedFileSize = document.getElementById("uploadedFileSize");

      uploadedFilename.textContent = data.fileName; // Use the actual property returned by your backend
      uploadedFileSize.textContent = `${data.fileSize} KB`; // Use the actual property returned by your backend
      currentFileId = data.fileId;

      // Show the file upload section
      fileUploadSection.style.display = "block";
    })
    .catch((error) => console.error("Error:", error));
}
