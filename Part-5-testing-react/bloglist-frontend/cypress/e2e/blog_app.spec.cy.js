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
      cy.get('.viewButton').click()
      cy.contains('https://www.google.fi')
    })

    it('A blog can be liked', function() {
      cy.contains('add blog').click()
      cy.get('#titleName').type('cypress test')
      cy.get('#authorName').type('the tester Man')
      cy.get('#blogUrl').type('https://www.google.fi')
      cy.contains('save').click()
      cy.get('.viewButton').click()
      cy.get('.likes').contains('Likes: 0')
      cy.contains('like').click()
      cy.get('.likes').contains('Likes: 1')
    })

    it.only('A blog with most likes is on top', function() {
      cy.contains('add blog').click()
      cy.get('#titleName').type('this is nice title')
      cy.get('#authorName').type('Winnie the Pooh')
      cy.get('#blogUrl').type('https://www.google.fi')
      cy.contains('save').click()

      cy.contains('add blog').click()
      cy.get('#titleName').type('where did they go?')
      cy.get('#authorName').type('John Wayne')
      cy.get('#blogUrl').type('https://www.google.com')
      cy.contains('save').click()

      cy.get('.viewButton').eq(0).click()
      cy.get('.likeButton').eq(0).click()
      cy.wait(2000)
      cy.get('.likeButton').eq(0).click()
      cy.wait(2000)
      cy.get('.likeButton').eq(0).click()
      cy.wait(2000)
      cy.get('.hideButton').eq(0).click()

      cy.get('.viewButton').eq(1).click()
      cy.get('.likeButton').eq(1).click()
      cy.wait(2000)
      cy.get('.likeButton').eq(1).click()
      cy.wait(2000)
      cy.get('.likeButton').eq(1).click()
      cy.wait(2000)
      cy.get('.likeButton').eq(1).click()
      cy.wait(2000)

      cy.get('.blog').eq(0).should('contain', 'where did they go')

    })
  })
})