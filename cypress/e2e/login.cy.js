describe('Login Form E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Başarılı form doldurulunca success sayfasına gider', () => {
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('StrongPass1');
    cy.get('[data-cy="terms-checkbox"]').check();
    cy.get('[data-cy="login-button"]').should('not.be.disabled').click();

    cy.url().should('include', '/success');
    cy.get('[data-cy="success-page"]').should('be.visible');
  });

  it('Email yanlışsa hata görünür ve buton disabled', () => {
    cy.get('[data-cy="email-input"]').type('yanlis-email').blur(); // ✅ blur doğru yerde
    cy.get('[data-cy="password-input"]').type('StrongPass1');
    cy.get('[data-cy="terms-checkbox"]').check();

    cy.get('[data-cy="email-error"]').should('be.visible');
    cy.get('[data-cy="login-button"]').should('be.disabled');
  });

  it('Email ve password yanlışsa iki hata görünür', () => {
    cy.get('[data-cy="email-input"]').type('yanlis').blur(); // ✅ email blur
    cy.get('[data-cy="password-input"]').type('123').blur(); // ✅ password blur

    cy.get('[data-cy="email-error"]').should('be.visible');
    cy.get('[data-cy="password-error"]').should('be.visible');
    cy.get('[data-cy="login-button"]').should('be.disabled');
  });

  it('Checkbox işaretlenmezse buton disabled kalır', () => {
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('StrongPass1');

    cy.get('[data-cy="login-button"]').should('be.disabled');
  });
});
