beforeEach(() => {
  cy.task('reseed');
});

it('should display input field', () => {
  cy.visit('/');
  cy.get('input').should('exist');
    // cy.get('input').should('have.attr', 'placeholder', 'Enter a new task');
});
