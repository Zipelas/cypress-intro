beforeEach(() => {
  cy.task('reseed');
  cy.visit('/');
});

describe('WalkForm, StatsForm, Combined', () => {
  it('should be able to visit, able to choose a date, month and year, able to enter a number in inputfield, able to write a name in inputfield and be able to save to database', () => {
    cy.get('[data-cy="date-input"]')
      .type('2025-09-04')
      .should('have.value', '2025-09-04');
    cy.get('[data-cy="walk-amount-input"]')
      .should('be.visible')
      .clear()
      .type('1500')
      .should('have.value', '1500');
    cy.get('[data-cy="walk-amount-input"]').clear().type('0').blur();
    cy.get('[data-cy="input-error"]').should(
      'contain.text',
      'Must be greater than 0'
    );
    cy.get('[data-cy="user-input"]')
      .clear()
      .type('Andreas Fagerlund')
      .should('have.value', 'Andreas Fagerlund');
    cy.get('[data-cy="save-button"]')
      .should('exist')
      .and('have.prop', 'tagName')
      .should('eq', 'BUTTON');

    cy.get('[data-cy="save-button"]').should('be.disabled');
  });

  it('should render names, support selecting, show stats, and allow deleting', () => {
    // 1) Namn läggs in i UL/LI
    cy.get('[data-cy="user-list"]').should('exist');
    cy.get('[data-cy="user-list"] li')
      .as('items')
      .should('have.length.greaterThan', 0);

    // 2) Namn-knappar är inte disabled (de ska gå att klicka)
    cy.get('@items')
      .first()
      .within(() => {
        cy.get('[data-cy="user-select"]').should('not.be.disabled');
        cy.get('[data-cy="user-delete"]').should('exist');
      });

    // Spara första användarens namn för senare jämförelse
    cy.get('@items')
      .first()
      .find('[data-cy="user-select"]')
      .invoke('text')
      .as('firstUserText');

    // 3) Dropdown disabled när inget namn är aktivt
    cy.get('[data-cy="dropdown"]').should('be.disabled');

    // 4) Aktivera namn (klick på user-select)
    cy.get('[data-cy="user-select"]').first().click();

    // 5) Dropdown blir enabled
    cy.get('[data-cy="dropdown"]').should('not.be.disabled');

    // 6) Välja alternativ i dropdown och kolla InfoCard
    cy.get('[data-cy="dropdown"]').select('avg');
    cy.get('[data-cy="infocard"]').should('contain.text', 'Går i snitt');

    cy.get('[data-cy="dropdown"]').select('monthly');
    cy.get('[data-cy="infocard"]').should(
      'contain.text',
      'Totalt denna månad:'
    );

    cy.get('[data-cy="dropdown"]').select('yearly');
    cy.get('[data-cy="infocard"]').should('contain.text', 'Totalt i år:');

    // 7) Klicka delete (röd kyss) och att namnet försvinner
    cy.get('@items').then(($lis) => {
      const initialCount = $lis.length;
      cy.get('[data-cy="user-select"]')
        .first()
        .invoke('text')
        .then((toDelete: string) => {
          cy.get('[data-cy="user-delete"]').first().click();
          cy.get('[data-cy="user-list"] li').should(
            'have.length',
            initialCount - 1
          );
          cy.get('[data-cy="user-list"]').should(
            'not.contain.text',
            toDelete.trim()
          );
        });
    });
  });
});
