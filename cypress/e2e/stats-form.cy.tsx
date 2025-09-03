beforeEach(() => {
  cy.task('reseed');
  cy.visit('/statistics');
});
describe('StatsForm', () => {
  it('should display infoCard', () => {
    cy.get('[data-cy="infocard"]').should('exist');
  });

  it('should display Button', () => {
    cy.get('button').should('exist');
  });

  it('should display dropdown', () => {
    cy.get('[data-cy="dropdown"]').should('exist').and('be.visible');
    cy.get('[data-cy="dropdown"] option')
      .not('[value=""]')
      .then(($opts) => {
        const texts = [...$opts].map((o) => o.textContent!.trim());
        expect(texts).to.deep.equal([
          'Gått i snitt',
          'Gått varje månad',
          'Gått totalt per år',
        ]);
      });
  });
});
