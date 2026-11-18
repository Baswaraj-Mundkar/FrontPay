<div align="center">

# FrontPay

### Scan UPI QR codes with your front camera.

A lightweight, browser-based QR scanner built for people who cannot use their phone's rear camera. Scan a UPI QR code with the front-facing camera, review the payment details, and continue in a compatible UPI app.

[**Open FrontPay**](https://baswaraj-mundkar.github.io/FrontPay/) · [Report an issue](https://github.com/Baswaraj-Mundkar/FrontPay/issues) · [Project ownership](OWNERSHIP.md)

</div>

---

## Why FrontPay?

Most UPI QR-scanning flows rely on the rear camera. That becomes a problem when the rear camera is damaged or unavailable, even if the front camera still works.

FrontPay provides a browser-based alternative: it requests the front-facing camera first and lets you continue to a payment app after scanning.

## Features

- **Front-camera-first scanning** — requests the device's front-facing camera by default.
- **QR image upload** — decode a QR code from an image stored on your device.
- **UPI detail preview** — display available recipient, VPA, amount and payment note details.
- **Payment-app handoff** — attempt to open PhonePe, Paytm, Google Pay or another UPI app.
- **No account required** — use the website without creating a FrontPay account.
- **Browser-based processing** — QR image decoding happens locally in the browser; this project does not upload QR images to a FrontPay server.

## Use FrontPay

1. Open **[FrontPay](https://baswaraj-mundkar.github.io/FrontPay/)** in a modern mobile browser.
2. Select **Start scanning** and allow camera permission.
3. Point the front camera at the UPI QR code.
4. Review the recipient, VPA and amount shown by FrontPay.
5. Choose a payment app and verify the details again in that app before authorising payment.

You can also select **Upload QR image** to scan a QR code from an image.

> **Payment safety:** Always verify the recipient and amount in your official UPI app. Never share your UPI PIN or enter it on FrontPay. FrontPay does not process payments or verify the identity of a merchant.

## Technology

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and camera/video elements |
| CSS3 | Responsive layout and interface styling |
| Vanilla JavaScript | Camera controls, QR handling and UPI handoff |
| [jsQR](https://github.com/cozmo/jsQR) | QR code decoding |
| [GitHub Pages](https://pages.github.com/) | Static website hosting |

No application framework or backend server is used by this project.

## Run locally

Camera access through `getUserMedia()` requires a secure context. Use **HTTPS** or **localhost**; opening the page directly as a local file or over an ordinary LAN HTTP address may prevent camera access.

### Option 1: Python

From the project directory, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: GitHub Pages

This repository is configured for GitHub Pages. To deploy your own fork:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select the `main` branch and the `/(root)` folder.
4. Save and wait for the deployment to complete.

## Project structure

```text
FrontPay/
├── index.html       # Page structure and content
├── style.css        # Layout, styling and responsive rules
├── script.js        # Camera, QR decoding and UPI handoff logic
├── README.md        # Project documentation
└── OWNERSHIP.md     # Authorship notes and development history
```

## Important limitations

- Camera access depends on browser support, permissions, device hardware and a secure context.
- QR decoding uses jsQR loaded from jsDelivr. An internet connection is required to load the library.
- The website requests the front camera first. The camera-switch control can request the rear camera; use it only if that camera is available and working.
- Opening a payment app depends on the browser, Android version, installed app and supported UPI intent handling. A handoff attempt does not guarantee that the app opened.
- FrontPay cannot verify merchant identity, guarantee that QR details are trustworthy, initiate or complete a payment, or confirm payment status.
- QR images are decoded in the browser. The project has no FrontPay backend to receive or store those images.

## Privacy and permissions

FrontPay requests camera access only when you start scanning. The camera stream is used in the browser to inspect frames for QR codes and is stopped when scanning stops or a QR code is detected. Image uploads are decoded in the browser and are not sent to a FrontPay server by this project.

The site loads the jsQR library from jsDelivr and web fonts from Google Fonts, so those services may receive normal network requests when the page loads.

## Ownership and usage

FrontPay was created and is maintained by **Baswaraj Mundkar**.

© 2026 Baswaraj Mundkar. All rights reserved, subject to applicable third-party licences and rights.

See [OWNERSHIP.md](OWNERSHIP.md) for project authorship notes and development history. No separate open-source licence is provided in this repository. Third-party libraries, fonts and assets remain subject to their respective licences and terms.

---

<div align="center">

**FrontPay** · A simpler way to scan when your rear camera isn't available.

</div>
