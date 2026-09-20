# SauceDemo E2E Test Automation — Playwright + TypeScript

End-to-end test suite for the SauceDemo web application, built with Playwright and TypeScript. It covers authentication and a full e-commerce purchase flow, runs across three browser engines, and executes automatically in CI on every push.

## What this suite covers
- Authentication: successful login, and a negative case verifying a locked-out user is rejected with the right error.
- End-to-end purchase flow: log in, add a product, verify the cart badge, check out, complete the order, assert the confirmation.
- Cross-browser: every test runs on Chromium, Firefox, and WebKit.

## Approach
- Page Object Model: selectors and page actions live in dedicated page classes, so tests read like user journeys and UI changes are fixed in one place.
- Stable, user-facing locators over brittle CSS/XPath — the biggest lever against flaky tests.
- Web-first auto-waiting assertions to remove timing flakiness.
- Positive and negative cases.

## Running locally
Requires Node.js 18+.

    npm install
    npx playwright install
    npx playwright test
    npx playwright test --headed
    npx playwright test --ui
    npx playwright show-report

## CI
Every push and pull request runs the suite via GitHub Actions across all three engines, uploading the HTML report as an artifact.

## Tech
Playwright · TypeScript · Node.js · GitHub Actions · Page Object Model
