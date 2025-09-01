describe('Walk form', () => {
  beforeEach(() => {
    cy.visit('/'); // ändra route om din sida ligger någon annanstans
    cy.task('reseed');
  });

  it('should display the datepicker', () => {
    cy.get('[data-cy="datepicker"]').should('exist').and('be.visible');
    cy.get('[data-cy="date-input"]')
      .should('have.attr', 'type', 'date')
      .and('be.visible');
  });


});
