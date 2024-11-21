describe('Likowanie', ()=>{
    it('Liked', ()=>{
        let val1;
        let val2;
        Cypress.session.clearAllSavedSessions()
        cy.visit('/targets')
        cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin1234'})
        cy.visit('/targets')

        cy.get('button.btn').contains('Follow').click()

        cy.get('.icon > div')
            .first()// Select the inner <div> inside the .icon class
            .invoke('text') // Get the text content
            .then((text) => {
                val1 = parseInt(text.trim()); // Remove any leading/trailing spaces
                // Log the value to the Cypress console
            });


        cy.get('.card-body .hover-link').first().click()



        cy.get('.icon > div') // Adjust the selector to match the second <div>
            .invoke('text')
            .then((text) => {
                val2 = parseInt(text.trim()); // Parse the text into a float
            });

        cy.then(() => {
            expect(val1 + 1).to.equal(val2); // Ensure the values are equal
        });
    })
})