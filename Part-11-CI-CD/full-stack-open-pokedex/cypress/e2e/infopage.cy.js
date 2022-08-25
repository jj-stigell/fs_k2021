describe('Pokedex', function() {
  it('individual pokemon page can be opened', function() {
    cy.visit('http://localhost:5001')
    cy.contains('venusaur').click()
    cy.contains('overgrow')
    cy.contains('speed')
  })
})