describe('sns-manager', () => {
  beforeEach(() => {
    cy.visit('/');
    Cypress.Cookies.debug(true);
  });

  it('should display welcome message', () => {
    cy.loginPinterest();
  });
});
