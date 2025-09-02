beforeEach(() => {
  cy.task('reseed');
  cy.visit('/');
});

it('should display dropdown', () => {
  cy.get('select').should('exist');
});

it('should display infoCard', () => {
  cy.visit('/');
  cy.get('div').should('exist');
});