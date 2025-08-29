beforeEach(() => {
  cy.task('reseed');
});

it('should display h1', () => {
  cy.visit('/');
  cy.get('h1').should('contain.text', 'Date picker');
});
