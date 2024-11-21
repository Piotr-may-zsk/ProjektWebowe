describe('Zglaszanie', () => {


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

    it('Wyswietlanie', () => {
        Cypress.session.clearAllSavedSessions()
        cy.visit('/reports')
        cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin1234'})
        cy.get('span.nav-link').contains(`konto@wp.pl`)
        cy.getCookie('_auth').should('exist')
        cy.visit('/reports')
        cy.contains('Cebula')
    })

    it('Details', ()=>{
        cy.visit('/reports')
        cy.visit('/reports/1000003')
        cy.get('h2').contains('Cebula')
        // cy.get('a.btn').contains('Wróć').click()
        // cy.url().should('include', '/reports')
    })

    it('Deaktywacja', ()=>{
        cy.visit('/reports')
        cy.get('.location div .hover-link').first().click()
        cy.get('button#activator').click()
        cy.visit('/reports')
        cy.get('button#filters').click()
        cy.get('input[name=actual]').uncheck()
        cy.get('button#applyFilters').click()
        cy.get('.location .actuality').first().contains('Nieaktualne')
    })

    it('Reaktywacja', ()=>{
        cy.visit('/reports')
        cy.get('button#filters').click()
        cy.get('input[name=actual]').uncheck()
        cy.get('button#applyFilters').click()
        cy.get('.location .actuality').first().contains('Nieaktualne')
        cy.get('.location div .hover-link').first().click()
        cy.get('button#activator').click()
        cy.visit('/reports')
        cy.get('.location .actuality').first().contains('Aktualne')

    })
})