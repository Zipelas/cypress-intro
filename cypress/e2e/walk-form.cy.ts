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

  it('should select a date', () => {
    const value = '2025-09-15';

    cy.get('[data-cy="date-input"]').then(($el) => {
      const input = $el[0] as HTMLInputElement;
      const proto = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      );
      proto?.set?.call(input, value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    cy.get('[data-cy="date-input"]').should('have.value', value);
  });


});
