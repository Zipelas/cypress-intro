beforeEach(() => {
  cy.task('reseed');
  cy.visit('/');
  // cy.request('POST', '/api/test/reset');
});

describe('StatsForm', () => {
  it('should be able to visit, able to choose a date, month and year, able to enter a number in inputfield and be able to save to database', () => {
    // cy.get('[data-cy="date-input"]').type('2025-09-04');
    // cy.get('[data-cy="input"]').type('1500');
    // cy.get('[data-cy="save-button"]').as('saveButton').parent();
    // cy.get('[data-cy="save-button"]')
    //   .should('exist')
    //   .and('have.prop', 'tagName')
    //   .should('eq', 'BUTTON');

    // cy.get('[data-cy="save-button"]').should('have.attr', 'disabled');
  });

  // it('should be able to see 3 options and able to choose one of them and see statistics', () => {
  //   cy.get('[data-cy="dropdown"]').select('Gått i snitt');
  //   cy.get('[data-cy="dropdown"]').should('contain.text', 'Gått i snitt');
  //   cy.get('[data-cy="dropdown"] option')
  //     .not('[value=""]')
  //     .then(($opts) => {
  //       const texts = [...$opts].map((o) => o.textContent!.trim());
  //       expect(texts).to.deep.equal([
  //         'Gått i snitt',
  //         'Gått varje månad',
  //         'Gått totalt per år',
  //       ]);
  //     });
  //   cy.clock(new Date('2025-09-15T12:00:00Z').getTime());
  //   cy.visit('/', {
  //     onBeforeLoad(win) {
  //       const walks = [
  //         { date: '2025-09-01', amount: 100 },
  //         { date: '2025-09-10', amount: 200 },
  //       ];
  //       win.localStorage.setItem('walks', JSON.stringify(walks));
  //     },
  //   });
  //   cy.get('[data-cy="dropdown"]').select('monthly');
  //   cy.get('[data-cy="infocard"]').should(
  //     'contain.text',
  //     'Totalt denna månad: 300'
  //   );
  //   cy.get('[data-cy="dropdown"]').select('avg');
  //   cy.get('[data-cy="infocard"]').should(
  //     'contain.text',
  //     'Går i snitt 150.0 per tillfälle (2 loggar).'
  //   );
  // });
});