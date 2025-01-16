// Wait for the form submission
document.getElementById("qr-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the URL input value
  const url = document.getElementById("url").value;

  //  to display the QR code and download link
  const resultDiv = document.getElementById("result");
  const qrCodeImg = document.getElementById("qr-code");
  const downloadLink = document.getElementById("download-link");

  try {
    //  POST request to the backend together with  the url
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }), // Convert URL to a JSON p
    });

    // Parse the JSON response
    const data = await response.json();

    // Set the QR code image and download link
    qrCodeImg.src = `data:image/png;base64,${data.qr}`;
    downloadLink.href = qrCodeImg.src;

    // Display the QR code and download link
    resultDiv.style.display = "block";
  } catch (error) {
    // Show an error message if something goes wrong
    alert("Failed to generate QR code. Please try again!");
  }
});
