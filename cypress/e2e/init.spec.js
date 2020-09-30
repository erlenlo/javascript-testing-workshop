import '@testing-library/cypress/add-commands';
import { lorem } from './util';

// lorem kan brukes til å generere tilfeldig tekst.
//
// lorem.generateWords(1)
// lorem.generateSentences(2)

const username = 'J.K. Rowling';

describe('Login', () => {
  it('can log in', () => {
    cy.visit('/');

    cy.findByPlaceholderText('Enter a username').type(username);

    cy.findByText('Register').click();

    cy.findByText(/A place to share stuff/).should('exist');
  });
});
