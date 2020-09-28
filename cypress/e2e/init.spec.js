import '@testing-library/cypress/add-commands';

describe('Cypress', () => {
  it('opens the app', () => {
    cy.visit('/')
      //.get('.form-control')
      .findByPlaceholderText('Enter a username')
      .type('user')
      .get('.btn') //.findByText(/Register/)
      .click()
      .get('.logo-font')
      //.findByText(/sharing hub/)
      .should('exist');
  });
});
