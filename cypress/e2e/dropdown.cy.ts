beforeEach(() => {
  cy.task('reseed');
});

it('should display dropdown', () => {
  cy.visit('/');
  cy.get('select').should('exist');
});
