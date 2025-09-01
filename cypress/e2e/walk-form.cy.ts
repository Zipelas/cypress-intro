const setDate = (value: string) => {
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
};

describe('Walk form', () => {
  beforeEach(() => {
    cy.task('reseed');
    cy.visit('/');
  });

  it('should display the datepicker', () => {
    cy.get('[data-cy="datepicker"]').should('exist').and('be.visible');
    cy.get('[data-cy="date-input"]')
      .should('have.attr', 'type', 'date')
      .and('be.visible');
  });

  it('should select a date (input value only)', () => {
    const value = '2025-09-15';
    setDate(value);
    cy.get('[data-cy="date-input"]').should('have.value', value);
  });

  // ⬇️ NYTT: verifiera att månad byts när ett datum i annan månad väljs
  it('should change month when selecting a date from a different month', () => {
    setDate('2025-01-15');
    cy.get('[data-cy="date-input"]')
      .invoke('val')
      .then((v) => {
        const value = String(v); // <— inga any
        const [, m] = value.split('-');
        expect(m).to.eq('01');
      });

    setDate('2025-12-20');
    cy.get('[data-cy="date-input"]')
      .invoke('val')
      .then((v) => {
        const value = String(v);
        const [, m] = value.split('-');
        expect(m).to.eq('12');
      });
  });

  // (valfritt) testa att byta både år och månad på en gång
  it('should allow changing year and month together', () => {
    setDate('2024-03-10');
    cy.get('[data-cy="date-input"]').should('have.value', '2024-03-10');

    setDate('2026-08-10');
    cy.get('[data-cy="date-input"]').should('have.value', '2026-08-10');
  });

  it('should show the text input', () => {
    cy.get('[data-cy="input"]').should('exist').and('be.visible');
  });
});
