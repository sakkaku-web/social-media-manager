describe('sns-manager', () => {
  it('should post on instagram', () => {
    cy.visit('https://www.instagram.com/');
    cy.wait(2000);

    cy.findByRole('button', { name: /only allow essential/i }).click();

    cy.findByRole('textbox', { name: /username/i }).type(
      Cypress.env('IG_USER')
    );
    cy.get('input[type=password]').type(Cypress.env('IG_PASSWORD') + '{enter}');

    cy.wait(5000);
    cy.findByRole('img', { name: /new post/i }).click();

    cy.get('input[type=file]').attachFile(Cypress.env('IMAGE_FILES'));

    cy.findByRole('button', { name: /next/i });
  });
});
