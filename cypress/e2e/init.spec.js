import '@testing-library/cypress/add-commands';

describe('Cypress', () => {
  it('opens the app', () => {
    cy.visit('/');

    cy.logInAsUser('user');

    cy.findByText('Register').click();

    cy.findByText(/Add article/).should('exist');
  });
});
