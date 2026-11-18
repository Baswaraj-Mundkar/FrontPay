# Security Policy

## Supported version

Security fixes are intended for the latest version deployed from the `main` branch.

## Reporting a vulnerability

Please do not disclose suspected vulnerabilities in a public issue or pull request.

Use GitHub's **Report a vulnerability** feature in the repository Security tab to send a private report. Include:

- A clear description of the vulnerability and its potential impact.
- Steps to reproduce it or a proof of concept.
- Affected files, browsers or versions.
- Any suggested mitigation.

If private vulnerability reporting is unavailable, contact the maintainer through the GitHub profile and request a private channel. Do not publish exploit details while waiting for a response.

## Scope and security boundaries

FrontPay is a static client-side QR scanner. It does not operate a payment backend, store user accounts or process transactions. Relevant security concerns include unsafe QR payload handling, unintended data transmission, dependency compromise, script injection and camera permission misuse.

FrontPay cannot verify the identity of a merchant or guarantee that a QR code is trustworthy. Users must verify payment details in their official UPI app.

## Response

The maintainer will review reports, request additional details if necessary and coordinate a fix and disclosure timeline with the reporter. No fixed response-time SLA is currently offered.
