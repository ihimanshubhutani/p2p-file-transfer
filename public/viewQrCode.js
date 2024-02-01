document.addEventListener("DOMContentLoaded", function () {
  const fileId = window.location.pathname.split("/").pop();
  const qrCodeContainer = document.getElementById("qrCodeContainer");

  // Make an API call to check if QR code exists or not
  fetch(`/api/view-qr-code/${fileId}`)
    .then((response) => {
      if (response.ok) {
        // QR code exists, display it
        return response.text();
      } else {
        // QR code doesn't exist, show a message
        throw new Error("File not found");
      }
    })
    .then((qrCodeDataUrl) => {
      // Display the QR code using the retrieved data URL
      const qrCodeImg = document.createElement("img");
      qrCodeImg.src = qrCodeDataUrl;
      qrCodeContainer.appendChild(qrCodeImg);
    })
    .catch((error) => {
      // Handle the error (e.g., show "File not found" message)
      console.error(error.message);
    });
});
