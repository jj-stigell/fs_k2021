describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User Man',
      username: 'user123',
      password: 'pass123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user123')
      cy.get('#password').type('pass123')
      cy.get('#login').click()
      cy.contains('logged-in')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user123')
      cy.get('#password').type('wrong123')
      cy.get('#login').click()
      cy.contains('invalid username or password')
    })
  })
})