# Architecture

## Application model

FrontPay is a static, client-side web application. GitHub Pages serves the files; there is no application server, database, authentication layer or payment-processing backend.

## Runtime flow

1. The user starts scanning and grants browser camera permission.
2. The browser requests the front-facing camera using the `getUserMedia()` API.
3. Video frames are drawn to a canvas and decoded in the browser by jsQR.
4. A decoded payload is inspected for a UPI payment URI and its available fields.
5. The user selects a payment app. FrontPay attempts a UPI intent handoff; the payment app remains responsible for payment confirmation and authorisation.

The image-upload flow also decodes the selected image in the browser.

## Source layout

- `index.html` is the GitHub Pages entry point and contains the page structure.
- `src/style.css` contains the responsive interface styles.
- `src/script.js` contains camera, QR decoding, parsing and payment-app handoff logic.
- `tests/` contains Node.js smoke tests for important static application invariants.
- `scripts/` contains repository validation utilities.

## External dependencies

- jsQR is loaded from jsDelivr at runtime.
- DM Sans and Manrope fonts are loaded from Google Fonts.

These third-party services may receive ordinary network requests. QR images are not uploaded to a FrontPay backend.

## Security boundaries

FrontPay is not a payment provider. It does not authenticate merchants, verify QR code ownership, initiate transactions, collect UPI PINs or confirm payment status. Payment details must be checked in the user's official UPI app before authorisation.

Camera access requires a secure browser context. Payment-app handoff behavior varies by browser, operating system and installed payment application.
