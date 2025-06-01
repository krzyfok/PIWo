describe('e2e BookShop ', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Hydration failed')) {
        return false;
      }
    });
    cy.visit('http://localhost:5173/');
    cy.wait(1000);
  });

  it('test strony głownejs', () => {
    cy.contains('Zaloguj się');
    cy.contains('Przeglądaj Książki');
    cy.contains('Dodaj Nową');
    cy.get('nav').should('exist');
  });

  it('test podstrony dodawania', () => {
    cy.contains('Dodaj Nową').click();
    cy.url().should('include', '/new');
    cy.get('form').should('exist');
  });

  it('filtrowanie ksiazek po tytule', () => {
  cy.get('input[placeholder="Szukaj książek po tytule..."]').type('Wladca Pierscieni');
  cy.get('.book-list, main').should('contain', 'Wladca Pierscieni');
  cy.get('.book-list, main').should('not.contain', 'TEST');
  cy.get('input[placeholder="Szukaj książek po tytule..."]').clear();
  cy.get('.book-list, main').should('contain', 'TEST');
});

});