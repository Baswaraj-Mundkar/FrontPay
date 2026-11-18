# FrontPay

A front-camera UPI QR scanner built with plain HTML, CSS and vanilla JavaScript.

## Deploy with GitHub Pages
In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.

## Notes and limitations
- QR decoding uses jsQR from jsDelivr CDN, so the first load requires internet access.
- Camera access requires HTTPS or localhost and user permission.
- The app requests the front-facing camera first. Camera switching is available after permission is granted.
- Payment handoff uses Android intent links targeted to PhonePe, Paytm and Google Pay. Browser, OS, and app versions determine whether a target app accepts the handoff. The generic UPI option may show the Android app chooser.
- This website cannot confirm whether an app opened, verify merchant identity, or complete a payment.
- Always confirm recipient and amount in the official payment app. Never enter a UPI PIN anywhere except the official payment app.
- QR images are processed locally in the browser and are not uploaded by this project.
