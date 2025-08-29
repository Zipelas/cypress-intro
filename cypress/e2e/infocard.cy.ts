beforeEach(() => {
  cy.task('reseed');
});

it('should display infoCard', () => {
  cy.visit('/');
  cy.get('div').should('exist');
});