import '@testing-library/cypress/add-commands';

describe('Cypress', () => {
  it('opens the app', () => {
    cy.visit('/');

    cy.findByPlaceholderText('Enter a username').type('user');

    cy.findByText('Register').click();

    cy.findByText(/Add article/).should('exist');
  });
});
