describe('User Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('starting checks', () => {
        expect(1 + 2).to.equal(3)
    })

    const nameInput = () => cy.get('input[name="name"]')
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')

    it('has the proper elements', () => {
        nameInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
    })

    describe('filling out inputs', () => {
        it('can type inside the name input', () => {
            nameInput()
            .should('have.value', '')
        })

        it('can type inside the email input' , () => {
            emailInput()
            .should('have.value', '')
        })

        it('can type inside the password input', () => {
            passwordInput()
            .should('have.value', '')
        })
    })

})