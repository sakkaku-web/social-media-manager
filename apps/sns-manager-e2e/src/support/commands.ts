import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    loginTwitter(): void;
    loginPinterst(): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('loginTwitter', () => {
  const user = Cypress.env('TWITTER_TEST_USER');
  const pw = Cypress.env('TWITTER_TEST_PW');

  cy.findByRole('button', { name: /twitter login/i }).click();
  cy.findByPlaceholderText(/username/i).type(user);
  cy.findByPlaceholderText(/password/i).type(pw);
  cy.findByRole('button', { name: /sign in/i }).click();
});

Cypress.Commands.add('loginPinterest', () => {
  const user = Cypress.env('PINTEREST_TEST_USER');
  const pw = Cypress.env('PINTEREST_TEST_PW');

  cy.findByRole('button', { name: /pinterest login/i }).click();
  cy.findByPlaceholderText(/email/i).type(user);
  cy.findByPlaceholderText(/password/i).type(pw);
  cy.findByRole('button', { name: /log in/i }).click();
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
