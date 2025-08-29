beforeEach(() => {
  cy.task('reseed');
});

it('should display input field', () => {
  cy.visit('/');
  cy.get('input').should('exist');

});
