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


  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'user123', password: 'pass123'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#titleName').type('cypress test')
      cy.get('#authorName').type('the tester Man')
      cy.get('#blogUrl').type('https://www.google.fi')
      cy.contains('save').click()

      cy.contains('cypress test')
      cy.contains('the tester Man')
      cy.contains('view').click()
      cy.contains('https://www.google.fi')
    })
  })




})