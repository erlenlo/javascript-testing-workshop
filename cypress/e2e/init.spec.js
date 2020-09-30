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

describe('Oppgave 2a', () => {
  it('can create new article', () => {
    const articleTitle = lorem.generateWords(3);
    const articleContent = lorem.generateSentences(3);
    const tag = lorem.generateWords(1);

    cy.visit('/');

    cy.findByPlaceholderText('Enter a username').type(username);

    cy.findByText('Register').click();

    cy.findByText(/Add article/).click();

    cy.findByPlaceholderText(/Article Title/).type(articleTitle);

    cy.findByPlaceholderText(/article/).type(articleContent);

    cy.findByPlaceholderText(/tags/).type(tag).type('{enter}');

    cy.findByText(/Publish/).click();

    cy.findByText(articleTitle).should('exist');

    cy.findByText(articleContent).should('exist');
    cy.findByText(articleContent).should('exist');
    cy.findByText(tag).should('exist');
  });
});

describe('Oppgave 2b', () => {
  it('can login', () => {
    cy.logInAsUser(username);
    cy.findByText(/A place to share stuff/).should('exist');
  });

  it('can create new article', () => {
    const articleTitle = lorem.generateWords(3);
    const articleContent = lorem.generateSentences(3);
    const tag = lorem.generateWords(1);

    cy.logInAsUser(username);

    cy.findByText(/Add article/).click();

    cy.findByPlaceholderText(/Article Title/).type(articleTitle);

    cy.findByPlaceholderText(/article/).type(articleContent);

    cy.findByPlaceholderText(/tags/).type(tag).type('{enter}');

    cy.findByText(/Publish/).click();

    cy.findByText(articleTitle).should('exist');

    cy.findByText(articleContent).should('exist');
    cy.findByText(articleContent).should('exist');
    cy.findByText(tag).should('exist');
  });
});

describe('Oppgave 2c', () => {
  it('Can create new article', () => {
    const articleTitle = lorem.generateWords(3);
    const articleContent = lorem.generateSentences(3);
    const tag = lorem.generateWords(1);

    cy.logInAsUser(username);

    cy.findByText(/Add article/).click();

    cy.findByPlaceholderText(/Article Title/).type(articleTitle);

    cy.findByPlaceholderText(/article/).type(articleContent);

    cy.findByPlaceholderText(/tags/).type(tag).type('{enter}');

    cy.findByText(/Publish/).click();

    const findLikeButton = () =>
      cy
        .findByText(articleTitle)
        .parent()
        .parent()
        .parent()
        .findByTestId('like-button');

    findLikeButton().click();

    cy.visit('/');

    findLikeButton().should('have.class', 'btn-primary');
  });
});

describe('Oppgave 3', () => {
  it('Can create new article with mocks', () => {
    const articleTitle = lorem.generateWords(3);
    const articleContent = lorem.generateSentences(3);
    const tag = lorem.generateWords(1);

    // Mock ut opprettelse av nye artikler
    cy.server().route({
      url: 'https://testing-js-backend.herokuapp.com/articles',
      method: 'POST',
      status: 200,
      response: {},
    });

    cy.logInAsUser(username);

    cy.findByText(/Add article/).click();

    cy.findByPlaceholderText(/Article Title/).type(articleTitle);

    cy.findByPlaceholderText(/article/).type(articleContent);

    cy.findByPlaceholderText(/tags/).type(tag).type('{enter}');

    cy.findByText(/Publish/).click();

    // Siden vi ikke opprettet artikkelen i backend må vi nå mocke ut
    // utlesing av alle artikler og legge til vår artikkel her.
    cy.server().route({
      url: 'https://testing-js-backend.herokuapp.com/articles',
      method: 'GET',
      status: 200,
      response: [
        {
          title: articleTitle,
          tags: [],
          text: articleContent,
          id: '11',
          author: { username: username },
          favoritedBy: [],
          createdAt: '2020-09-30T16:20:34.274Z',
        },
      ],
    });

    cy.visit('/');

    cy.findByText(articleTitle).should('exist');
  });
});
