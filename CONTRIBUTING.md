# Contributing to FrontPay

Thank you for considering a contribution.

## Before you start

- Check existing issues and pull requests to avoid duplicate work.
- For significant changes, open an issue first to discuss the approach.
- Keep changes focused. Avoid introducing frameworks or backend services without a clear product requirement.
- Do not include real QR payment data, credentials, API keys or other personal information in commits, screenshots or test fixtures.

## Report a bug

Use the bug report issue template. Include:

- Browser and operating system versions.
- Device model where relevant.
- Steps to reproduce the issue.
- Expected and actual behavior.
- Console errors or screenshots with personal/payment information removed.

Do not report security vulnerabilities through public issues. Follow [SECURITY.md](SECURITY.md).

## Pull request workflow

1. Fork the repository and create a focused branch from `main`.
2. Make the smallest coherent change that solves the issue.
3. Run the repository checks:
   ```bash
   npm run lint
   npm test
   npm run validate
   npm run format:check
   ```
4. Test camera behavior on a real supported device when changing camera or scanning code.
5. Open a pull request against `main` and complete the pull request template.

## Coding conventions

- Use semantic HTML and accessible labels.
- Use two spaces for indentation and UTF-8/LF line endings.
- Prefer modern browser APIs and vanilla JavaScript.
- Avoid unnecessary dependencies and network requests.
- Handle camera permission, missing-device and decoding failures explicitly.
- Never log or transmit decoded payment payloads.
- Preserve the rule that FrontPay does not request or handle UPI PINs.

## Commit messages

Use Conventional Commits:

- `feat:` new functionality
- `fix:` bug fixes
- `docs:` documentation-only changes
- `refactor:` code restructuring without behavior changes
- `test:` tests
- `chore:` tooling and maintenance

Example: `fix: stop camera stream after scan`.

## Review expectations

A pull request should explain the problem, summarize the change, list relevant tests and identify any user-visible behavior changes. Maintainers may request revisions before merging.
