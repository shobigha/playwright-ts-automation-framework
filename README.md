
# Playwright TypeScript Automation Framework

![Playwright Tests](https://github.com/shobigha/playwright-ts-automation-framework/actions/workflows/playwright.yml/badge.svg)

## Overview

A test automation framework for [saucedemo.com](https://www.saucedemo.com), built with Playwright and TypeScript. It uses the Page Object Model, custom fixtures, environment-based configuration and data-driven tests, and it runs automatically on every push with GitHub Actions.

## Tech Stack

- Playwright Test
- TypeScript
- Node.js
- GitHub Actions (CI)

## Features

- **Page Object Model:** one class per page, with a shared `BasePage` that the page classes extend
- **Custom fixtures:** tests receive ready-made page objects (`login`, `inventory`) instead of creating them
- **Environment config:** base URL and credentials come from `.env.qa` and `.env.staging`, chosen with an `ENV` variable
- **Data-driven tests:** login scenarios are read from an Excel sheet, and each row becomes its own test
- **Session reuse:** a setup project logs in once and saves the session (`storageState`), so cart tests start already logged in
- **Tags:** tests are labelled `@smoke`, `@regression` and `@api`, and can be run by tag
- **API tests:** Playwright's `request` fixture, with no browser needed
- **CI pipeline:** GitHub Actions runs the suite on every push and saves the HTML report

## Project Structure

```
├── .github/workflows/   CI workflow (GitHub Actions)
├── fixtures/            custom fixtures that create page objects
├── pages/               page objects (BasePage, LoginPage, InventoryPage)
├── tests/               test files and the login setup
├── test-data/           Excel data for data-driven tests
├── playwright.config.ts Playwright settings and projects
├── .env.example         template for the environment files
└── tsconfig.json        TypeScript settings
```

## Getting Started

1. Clone the repo and install the packages:
   ```bash
   npm install
   ```
2. Install the browsers:
   ```bash
   npx playwright install
   ```
3. Create your environment files from the template, then fill in the values:
   ```bash
   copy .env.example .env.qa
   copy .env.example .env.staging
   ```

   The files need `BASE_URL`, `APP_USER` and `APP_PASS`. The saucedemo demo logins are public (`standard_user` / `secret_sauce`).

## Running Tests

```bash
# run everything
npx playwright test

# logged-in tests (runs the login setup first)
npx playwright test --project=chromium-auth

# logged-out tests (login, data-driven, API)
npx playwright test --project=chromium

# run by tag
npx playwright test --grep @smoke
npx playwright test --grep @api

# choose an environment (PowerShell)
$env:ENV="staging"; npx playwright test

# open the HTML report
npx playwright show-report
```

## CI/CD

The GitHub Actions workflow runs on every push and pull request to `main`. It installs the dependencies and browsers, runs the Playwright suite, and uploads the HTML report as an artifact. The base URL is stored as a repository variable and the credentials as repository secrets, so no environment file is committed.

## Future Improvements

- Checkout flow tests
- Allure reporting
- Run only `@smoke` tests on each push, and the full suite on a schedule
- ESLint and Prettier for consistent code style
