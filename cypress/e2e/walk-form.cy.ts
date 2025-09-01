const setDate = (value: string) => {
  cy.get('[data-cy="date-input"]').then(($el) => {
    const input = $el[0] as HTMLInputElement;
    const proto = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
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
    cy.visit('/'); // update if your form lives on another route
  });

  // ---------- DatePicker basic ----------
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

  // ---------- Month switch ----------
  it('should change month when selecting a date from a different month', () => {
    setDate('2025-01-15');
    cy.get('[data-cy="date-input"]')
      .invoke('val')
      .then((v) => {
        const [, month] = String(v).split('-');
        expect(month).to.eq('01');
      });

    setDate('2025-12-20');
    cy.get('[data-cy="date-input"]')
      .invoke('val')
      .then((v) => {
        const [, month] = String(v).split('-');
        expect(month).to.eq('12');
      });
  });

  // ---------- Year switch ----------
  it('should change year when selecting a date from a different year', () => {
    setDate('2024-09-15');
    cy.get('[data-cy="date-input"]')
      .invoke('val')
      .then((v) => {
        const [year] = String(v).split('-');
        expect(year).to.eq('2024');
      });

    setDate('2026-09-15');
    cy.get('[data-cy="date-input"]')
      .invoke('val')
      .then((v) => {
        const [year] = String(v).split('-');
        expect(year).to.eq('2026');
      });
  });

  // ---------- Leap year edge cases ----------
  it('should accept leap day on a leap year', () => {
    setDate('2024-02-29');
    cy.get('[data-cy="date-input"]').should('have.value', '2024-02-29');
  });

  it('should reject leap day on a non-leap year', () => {
    setDate('2025-02-29');
    cy.get('[data-cy="date-input"]')
      .invoke('val')
      .then((v) => {
        const value = String(v);
        expect(value).to.not.eq('2025-02-29'); // often becomes ''
      });
  });

  // ---------- InputField presence ----------
  it('should show the text input', () => {
    cy.get('[data-cy="input"]').should('exist').and('be.visible');
  });

  // ---------- InputField typing ----------
  it('should allow typing into the InputField', () => {
    const text = '3000';
    cy.get('[data-cy="walk-amount-input"]')
      .should('have.attr', 'placeholder', 'Enter how much you have walked')
      .type(text)
      .should('have.value', text);
  });

  it('should allow clearing the InputField', () => {
    cy.get('[data-cy="walk-amount-input"]')
      .type('some text')
      .clear()
      .should('have.value', '');
  });

  // ---------- Zod validation (requires InputField with Zod + error rendering) ----------
  it('should show a validation error for empty input on blur', () => {
    // säkerställ att fältet är tomt och fokuserat
    cy.get('[data-cy="walk-amount-input"]').should('have.value', '').click();

    // blur genom att klicka utanför
    cy.get('body').click('topLeft');

    // först: aria-invalid
    cy.get('[data-cy="walk-amount-input"]').should(
      'have.attr',
      'aria-invalid',
      'true'
    );

    // sen: felmeddelandet
    cy.get('[data-cy="input-error"]')
      .should('be.visible')
      .and('contain.text', 'Value is required');
  });

  it('should show a validation error for non-numeric input', () => {
    cy.get('[data-cy="walk-amount-input"]').type('abc');
    cy.get('body').click('topLeft');

    cy.get('[data-cy="walk-amount-input"]').should(
      'have.attr',
      'aria-invalid',
      'true'
    );

    cy.get('[data-cy="input-error"]')
      .should('be.visible')
      .and('contain.text', 'Please enter a whole number');
  });

  it('should show a validation error for zero or negative numbers', () => {
    cy.get('[data-cy="walk-amount-input"]').type('0');
    cy.get('body').click('topLeft');

    cy.get('[data-cy="walk-amount-input"]').should(
      'have.attr',
      'aria-invalid',
      'true'
    );

    cy.get('[data-cy="input-error"]')
      .should('be.visible')
      .and('contain.text', 'Must be greater than 0');

    cy.get('[data-cy="walk-amount-input"]').clear().type('-5');
    cy.get('body').click('topLeft');

    cy.get('[data-cy="walk-amount-input"]').should(
      'have.attr',
      'aria-invalid',
      'true'
    );

    cy.get('[data-cy="input-error"]')
      .should('be.visible')
      .and('contain.text', 'Please enter a whole number');
  });

  it('should clear the validation error when input becomes valid', () => {
    cy.get('[data-cy="walk-amount-input"]').type('abc');
    cy.get('body').click('topLeft');

    cy.get('[data-cy="input-error"]').should('be.visible');

    cy.get('[data-cy="walk-amount-input"]').clear().type('3000');
    cy.get('body').click('topLeft');

    cy.get('[data-cy="walk-amount-input"]').should(
      'have.attr',
      'aria-invalid',
      'false'
    );
    cy.get('[data-cy="input-error"]').should('not.exist');
  });
});
