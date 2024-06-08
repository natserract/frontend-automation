import { cy, describe, it } from 'local-cypress'

describe('smoke tests', () => {
  it('App loads and nav works', () => {
    cy.visit('/')
    cy.get('main').children().should('have.length.gte', 1)
  })
})
