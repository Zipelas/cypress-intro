beforeEach(() => {
  cy.task('reseed');
});

it('should display button', () => {
  cy.visit('/');

});