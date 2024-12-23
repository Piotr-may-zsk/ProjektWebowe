/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("loginViaUi", (user) => {
    cy.session(
        user,
        () => {
            cy.visit('/login')
            cy.get('input[name=email]').type(user.email)
            cy.get('input[name=password]').type(user.password)
            cy.get('button.btn').click()
            // cy.get('span.nav-link').contains(`${user.email}`)
        },
        {
            validate: () => {
                return true
            },
        }
    )
})

Cypress.Commands.add("registerViaUi", (user) => {
    cy.session(
        user,
        () => {
            cy.get("a#register").click()
            cy.get('input[name=email]').type(user.email)
            cy.get('input[name=username]').type(user.name)
            cy.get('input[name=password1]').type(user.password1)
            cy.get('input[name=password2]').type(user.password2)
            cy.get('button.btn').click()
            // cy.get('span.nav-link').contains(`${user.email}`)
        },
        {
            validate: () => {
                return true
            },
        }
    )
})