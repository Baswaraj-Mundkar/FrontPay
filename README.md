# FrontPay

**Scan UPI QR codes using your phone's front camera.**

FrontPay is a lightweight, browser-based UPI QR scanner designed for situations where a phone's rear camera is damaged or unavailable. It scans with the front-facing camera, displays the payment details encoded in the QR code, and attempts to hand the UPI payment URI to a compatible payment app.

[Open the live website](https://baswaraj-mundkar.github.io/FrontPay/) · [Report a bug](https://github.com/Baswaraj-Mundkar/FrontPay/issues) · [Ownership and project history](OWNERSHIP.md)

## Features

- Front-camera-first QR scanning.
- QR decoding from uploaded images.
- Preview of available recipient, UPI ID, amount and payment note.
- Handoff attempts to PhonePe, Paytm, Google Pay and other UPI apps.
- No account or application installation required.
- QR decoding takes place in the browser; this project has no backend and does not upload QR images to a FrontPay server.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- [jsQR](https://github.com/cozmo/jsQR) for QR decoding
- GitHub Pages for static hosting

## Requirements

- A modern browser with camera and JavaScript support.
- HTTPS or `localhost` for camera access through `getUserMedia()`.
- An internet connection to load jsQR from jsDelivr and fonts from Google Fonts.
- Node.js 22 or later only if you want to run the repository checks locally.

## Run locally

Clone the repository:

```bash
git clone https://github.com/Baswaraj-Mundkar/FrontPay.git
cd FrontPay
```

Start a local static server:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

Do not open `index.html` directly as a local file. Ordinary LAN HTTP addresses are not generally treated as secure contexts for camera access.

## Quality checks

Install Node.js 22 or later, then run:

```bash
npm run lint
npm test
npm run validate
npm run format:check
```

These checks validate JavaScript syntax and lint rules, run the project's smoke tests, verify local asset references, and check documentation/configuration formatting. They do not replace testing camera permissions, QR decoding or payment-app handoff on real devices.

## Project structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── pull_request_template.md
├── docs/
│   └── ARCHITECTURE.md
├── scripts/
│   └── validate.mjs
├── src/
│   ├── script.js
│   └── style.css
├── tests/
│   └── site.test.mjs
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── OWNERSHIP.md
├── README.md
├── SECURITY.md
├── commitlint.config.cjs
├── eslint.config.js
├── index.html
└── package.json
```

## Security and privacy

Camera access is requested only after the user starts scanning. The camera stream is processed in the browser and stopped when scanning ends or a QR code is detected. Uploaded QR images are decoded locally by the browser.

The site loads third-party resources from jsDelivr and Google Fonts. Those providers may receive standard network requests when the page loads. See [SECURITY.md](SECURITY.md) for vulnerability reporting guidance.

**Payment safety:** FrontPay does not process payments, verify merchant identity or confirm payment status. Always verify the recipient and amount inside your official UPI app. Never enter your UPI PIN on FrontPay.

## Contributing

Bug reports and focused improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Commit messages are checked against Conventional Commits on pull requests.

## License

The project source is currently reserved by its copyright holder; no open-source reuse licence is granted. See [LICENSE](LICENSE) and [OWNERSHIP.md](OWNERSHIP.md). Third-party dependencies, fonts and assets remain subject to their own licences.
