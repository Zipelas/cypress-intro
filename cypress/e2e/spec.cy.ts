describe('todo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display three todos by default', () => {
    cy.get('li').should('have.length', 3);
    cy.get('li').first().should('contain.text', 'Feed the cat');
    cy.get('li').last().contains('Walk all the cats');
    cy.get('ul').find('li').its('length').should('be.gt', 0); // kollar om li finns i ul
  });
  it('should be able to delete a todo', () => {
    cy.contains('Feed the cat').find('button').click();
    cy.get('li').should('have.length', 2);
    cy.contains('Feed the cat').should('not.exist');
  });
  // it('should be able to add a todo', () => {
  //   const newTodo = 'New Todo';
  //   cy.get('input').type(newTodo);
  //   cy.get('button').contains('Add Todo').click();
  //   cy.get('li').should('contain.text', 'Lägg till');
  // });
});
