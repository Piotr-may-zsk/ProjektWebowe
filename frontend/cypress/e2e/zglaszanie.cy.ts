describe('Zglaszanie', () => {
    it('Wyswietlanie', () => {
        Cypress.session.clearAllSavedSessions()
        cy.visit('/reports')
        cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin1234'})
        cy.get('span.nav-link').contains(`konto@wp.pl`)
        cy.getCookie('_auth').should('exist')
        cy.visit('/reports')
        cy.contains('Cebula')
    })

    it('Zglaszanie', ()=>{
        cy.visit('/targets')
        cy.get('button.btn').contains('Follow').click()
        cy.visit('/report')

        cy.get('select').select(1);

        cy.get('input[name=address]').type('Fredry, 13')
        cy.get('textarea[name=details]').type('Znaleziono')
        cy.get('button.btn-primary').click()

        cy.url().should('include', '/reports')
    })

    it('Details', ()=>{
        cy.visit('/reports')
        cy.visit('/reports/1000003')
        cy.get('h2').contains('Cebula')
        // cy.get('a.btn').contains('Wróć').click()
        // cy.url().should('include', '/reports')
    })
})