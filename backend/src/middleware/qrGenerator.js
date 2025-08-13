import QRCode from 'qrcode';

export async function generateQRCode(data) {
  try {
    // Returns a base64 image string
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(data));
    return qrCodeDataURL;
  } catch (err) {
    console.error("QR generation failed:", err);
    throw err;
  }
}
