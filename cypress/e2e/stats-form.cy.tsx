beforeEach(() => {
  cy.task('reseed');
  cy.visit('/');
});

it('should display dropdown', () => {
  cy.get('select').should('exist');
});
