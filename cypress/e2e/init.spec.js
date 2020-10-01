import '@testing-library/cypress/add-commands';

// lorem kan brukes til å generere tilfeldig tekst.
//
// lorem.generateWords(1)
// lorem.generateSentences(2)
//
// NB! Dette er ikke noe som følger med Cypress, men vi har satt opp disse
// hjelpefunksjonene i /cypress/support/* slik at de er tilgjengelig for alle
// Cypress-testene i dette prosjektet

const username = 'J.K. Rowling';

describe('Login', () => {
  it('can log in', () => {
    cy.visit('/');

    cy.findByPlaceholderText('Enter a username').type(username);

    cy.findByText('Register').click();

    cy.findByText(/A place to share stuff/).should('exist');
  });
});
