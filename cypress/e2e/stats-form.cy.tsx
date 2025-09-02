beforeEach(() => {
  cy.task('reseed');
  cy.visit('/');
});
describe('StatsForm', () => {
  it('should display infoCard', () => {
    cy.visit('/');
    cy.get('div').should('exist');
  });
  
  it('should display dropdown', () => {
    cy.get('select').should('exist');
  });
});