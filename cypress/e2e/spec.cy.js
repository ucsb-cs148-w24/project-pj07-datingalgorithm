describe('go to home page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000')
  })
  it ('clicks on the about link', () => {
    cy.get('button').contains('About').click()
  })
  it ('signs in and navigates the app', () => {
    cy.get('button').contains('Sign In').click()
    cy.wait(30000) // Wait for 5 seconds to allow Google OAuth to be approved
    cy.get('button').contains('Profile').click()
    cy.get('button').contains('Keep Swiping').click()
    cy.get('button').contains('Go to Chat').click()
    // cy.get('button').contains('Sign Out').click()
  }
  )
})
