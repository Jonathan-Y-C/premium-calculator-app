
# Premium Calculator App

This project is a technical showcase for a Full-stack Developer role (Angular/.NET/Azure) as part of a job application technical test. It demonstrates modern Angular development, clean UI/UX, and business logic implementation for an insurance premium calculator.

## Project Purpose

As a Member, I want to enter my details and see my monthly insurance premium calculated and displayed on the screen.

## Features

- Built with Angular 20 and Bootstrap for a clean, responsive UI
- All fields are mandatory: Name, Age Next Birthday, Date of Birth (mm/YYYY), Usual Occupation, Death – Sum Insured
- Occupation dropdown with correct mapping to rating and factor
- Premium calculation formula: `(Death Cover amount * Occupation Rating Factor * Age) / 1000 * 12`
- Changing occupation triggers recalculation
- Form validation and user feedback
- Easy to extend for further requirements (unit tests, backend integration, etc.)

## Usage

1. Install dependencies:
	```bash
	npm install
	```
2. Start the development server:
	```bash
	npx ng serve --open
	```
3. The app will open in your browser. Enter all required fields to see the calculated premium.

## Assumptions & Clarifications

- Age Next Birthday is a positive integer.
- Date of Birth must be in `mm/YYYY` format.
- Death – Sum Insured is a positive number (in dollars).
- All fields are required for calculation.
- Occupation list and rating factors are as per the technical test.
- No backend/API integration is included (can be added if required).

## For Reviewers

- The code is committed incrementally to show solution evolution.
- The UI and logic are easily extensible for further requirements (unit tests, backend, etc.).
- Please see the source code for business logic and validation details.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
