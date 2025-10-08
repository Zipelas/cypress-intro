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
    cy.get('[data-cy="user-list"]')
      .should('exist')
      .find('li')
      .as('items')
      .should('have.length.greaterThan', 0);
    cy.get('@items')
      .first()
      .within(() => {
        cy.get('[data-cy="user-select"]').should('not.be.disabled');
        cy.get('[data-cy="user-delete"]').should('exist');
      });
    cy.get('[data-cy="dropdown"]').should('be.disabled');
    cy.get('[data-cy="user-select"]').first().click();
    cy.get('[data-cy="dropdown"]')
      .should('not.be.disabled')
      .find('option')
      .not('[value=""]')
      .then(($opts) => {
        const texts = $opts.get().map((o) => (o.textContent || '').trim());
        expect(texts).to.deep.equal([
          'Gått i snitt',
          'Gått varje månad',
          'Gått totalt per år',
        ]);
      })
      .should('have.length', 3);
    cy.get('[data-cy="dropdown"]').select('avg').should('have.value', 'avg');
    cy.get('[data-cy="infocard"]').should('contain.text', 'Går i snitt');
    cy.get('[data-cy="dropdown"]')
      .select('monthly')
      .should('have.value', 'monthly');
    cy.get('[data-cy="infocard"]').should(
      'contain.text',
      'Totalt denna månad:'
    );
    cy.get('[data-cy="dropdown"]')
      .select('yearly')
      .should('have.value', 'yearly');
    cy.get('[data-cy="infocard"]').should('contain.text', 'Totalt i år:');
    cy.get('@items')
      .its('length')
      .then((initialCount: number) => {
        cy.get('[data-cy="user-select"]')
          .first()
          .invoke('text')
          .then((name: string) => {
            const trimmed = name.trim();
            cy.get('[data-cy="user-delete"]').first().click();
            cy.get('[data-cy="user-list"] li').should(
              'have.length',
              initialCount - 1
            );
            cy.get('[data-cy="user-list"]').should('not.contain.text', trimmed);
          });
      });
  });
});
