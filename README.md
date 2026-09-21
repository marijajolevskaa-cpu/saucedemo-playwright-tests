# SauceDemo E2E Test Automation — Playwright + TypeScript

![Playwright Tests](https://github.com/marijajolevskaa-cpu/saucedemo-playwright-tests/actions/workflows/playwright.yml/badge.svg)

End-to-end test suite for the SauceDemo web application, built with Playwright and TypeScript. It covers authentication and a full e-commerce purchase flow, runs across three browser engines, and executes automatically in CI on every push.

## What this suite covers
- Authentication: successful login, and a negative case verifying a locked-out user is rejected with the right error.
- End-to-end purchase flow: log in, add a product, verify the cart badge, check out, complete the order, assert the confirmation.
- Data-driven login: a single test runs across multiple user types, generated from a data set.
- Cross-browser: every test runs on Chromium, Firefox, and WebKit.

## Approach
- Page Object Model: selectors and page actions live in dedicated page classes, so tests read like user journeys and UI changes are fixed in one place.
- Custom fixtures: reusable setup (e.g. an already-logged-in page) is injected into tests, keeping each test focused only on what it verifies.
- beforeEach hooks and data-driven loops to remove repetition.
- Stable, user-facing locators over brittle CSS/XPath.
- Web-first auto-waiting assertions.
- Positive and negative cases.

## Reliability engineering
This suite includes a real example of diagnosing and fixing a flaky test. The
\`performance_glitch_user\` account logs in with a deliberate delay, which
intermittently exceeded the default 5s assertion timeout and caused
non-deterministic failures. The fix was a targeted per-assertion timeout for that
case — giving the known-slow operation enough time without slowing the rest of the
suite or resorting to blind fixed waits. Flaky tests are the most common and most
expensive problem in test automation, and this suite demonstrates identifying the
root cause and applying a precise fix.

## Project structure
\`\`\`
.
├── pages/            # Page Objects: LoginPage, InventoryPage, CheckoutPage
├── tests/            # Specs: login, checkout, data-driven, fixture-based
├── fixtures.ts       # Custom fixtures (e.g. loggedInPage)
├── .github/workflows/ # CI: runs the suite on every push / PR
└── playwright.config.ts
\`\`\`

## Running locally
Requires Node.js 18+.

    npm install
    npx playwright install
    npx playwright test          # headless, all browsers
    npx playwright test --headed # watch it run
    npx playwright test --ui     # interactive runner
    npx playwright show-report   # last HTML report

## CI
Every push and pull request runs the suite via GitHub Actions across all three engines, uploading the HTML report as an artifact.

## Tech
Playwright · TypeScript · Node.js · GitHub Actions · Page Object Model
