beforeEach(() => {
  cy.task('reseed');
});

it('should display button', () => {
  cy.visit('/');
  cy.get('button').should('exist');
  cy.get('button').should('contain.text', 'See statistics');
});