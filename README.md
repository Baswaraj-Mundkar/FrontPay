<div align="center">

# FrontPay

### Scan UPI QR codes using your phone's front camera.

A lightweight, browser-based UPI QR scanner designed for situations where the rear camera is damaged or unavailable. Scan with the front camera, review the decoded payment details, and continue in a compatible UPI app.

[**Open FrontPay**](https://baswaraj-mundkar.github.io/FrontPay/) · [Report an issue](https://github.com/Baswaraj-Mundkar/FrontPay/issues) · [Ownership and project history](OWNERSHIP.md)

</div>

---

## Overview

Most UPI QR-scanning experiences use a phone's rear camera. If that camera is damaged or unavailable, scanning a payment QR code can become difficult—even when the front camera still works.

FrontPay offers an alternative: it uses the front-facing camera to read a UPI QR code and then passes the payment URI to a compatible payment app for review.

## Features

- **Front-camera-first scanning** — requests the front-facing camera by default.
- **QR image scanning** — decode a QR code from an image on your device.
- **Payment detail preview** — display the recipient, UPI ID, amount and payment note when those details are present in the QR code.
- **UPI app handoff** — attempt to open PhonePe, Paytm, Google Pay or another compatible UPI app.
- **No account or installation required** — runs in a supported web browser.
- **Local QR decoding** — QR data is processed in the browser; this project does not send QR images to a FrontPay backend.

## How to use

1. Open [FrontPay](https://baswaraj-mundkar.github.io/FrontPay/) in a supported mobile browser.
2. Select **Start scanning** and grant camera permission.
3. Point the front camera at a UPI QR code.
4. Review the payment details displayed on the page.
5. Continue to a payment app and verify the recipient and amount again before authorising the payment.

You can also use **Upload QR image** to scan a QR code saved on your device.

> **Payment safety:** Always verify the recipient and amount inside your official UPI app before paying. Never enter your UPI PIN on FrontPay. FrontPay does not process payments, verify merchant identity or confirm payment status.

## Built with

| Technology | Role |
| --- | --- |
| HTML5 | Page structure and camera/video elements |
| CSS3 | Responsive layout and interface styling |
| Vanilla JavaScript | Camera controls, QR processing and UPI handoff |
| [jsQR](https://github.com/cozmo/jsQR) | QR code decoding |
| [GitHub Pages](https://pages.github.com/) | Static website hosting |

FrontPay does not use a frontend framework or a custom backend.

## Run locally

Camera access through the browser's `getUserMedia()` API requires a secure context. For local testing, use `localhost`; opening the page as a local file or through an ordinary LAN HTTP address may block camera access.

1. Clone the repository and open the project directory:

   ```bash
   git clone https://github.com/Baswaraj-Mundkar/FrontPay.git
   cd FrontPay
   ```

2. Start a local server:

   ```bash
   python -m http.server 8000
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser.

## Project structure

```text
FrontPay/
├── index.html       # Page structure and content
├── style.css        # Layout and responsive styling
├── script.js        # Camera, QR decoding and UPI handoff
├── README.md        # Project documentation
└── OWNERSHIP.md     # Authorship notes and development history
```

## Technical notes and limitations

- Camera availability depends on the browser, device hardware, permissions and secure-context requirements.
- The jsQR library is loaded from jsDelivr, so an internet connection is required to load it.
- FrontPay requests the front camera first. The camera-switch control may request the rear camera, if available.
- Opening a payment app depends on the browser, operating system, installed apps and their support for UPI links. A handoff attempt does not guarantee that an app will open.
- FrontPay only reads the payment information encoded in a QR code. It cannot establish whether the recipient is genuine or whether the QR code is safe.
- FrontPay does not initiate, process or verify payments.

## Privacy

Camera access is requested when you start scanning. The camera stream is processed in the browser and is stopped when scanning ends or a QR code is detected. Uploaded QR images are also decoded in the browser; this project does not upload them to a FrontPay server.

The page loads jsQR from jsDelivr and web fonts from Google Fonts. Those providers may receive standard network requests when the page loads.

## Ownership

FrontPay was created and is maintained by **Baswaraj Mundkar**.

© 2026 Baswaraj Mundkar. All rights reserved, subject to applicable third-party licences and rights.

See [OWNERSHIP.md](OWNERSHIP.md) for authorship notes and the project's development history. No separate open-source licence is provided in this repository. Third-party libraries, fonts and assets remain subject to their respective licences and terms.

---

<div align="center">

**FrontPay** · An alternative when your rear camera isn't available.

</div>
