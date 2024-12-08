/// <reference types="cypress" />

/**
 * Caso de prueba: REG-001
 * Descripción: Validar el registro exitoso de un nuevo usuario con un username único.
 * Precondiciones:
 *  - La página principal debe ser accesible.
 *  - El modal de registro debe cargarse correctamente al hacer clic en "Sign up".
 * Resultados esperados:
 *  - El sistema debe registrar al usuario de forma exitosa y mostrar un mensaje de confirmación.
 */

describe('Validación de registro de usuarios', () => {
  it('REG-001 | Validación de registro de usuarios', () => {
    // Generar un username único basado en un timestamp
    const uniqueUsername = `usuario_${Date.now()}`
    const password = 'contraseñaSegura123'

    // Acceder a la página principal
    cy.visit('/')

    // Abrir el modal de registro
    cy.get('#signin2').click()

    // Verificar que el modal sea visible
    cy.get('#signInModal').should('be.visible')

    // Escribir en el campo de usuario utilizando {force: true}
    cy.get('#sign-username').type(uniqueUsername, { force: true })

    // Verificar que el valor se haya ingresado correctamente
    cy.get('#sign-username').should('have.value', uniqueUsername)

    // Escribir en el campo de contraseña utilizando {force: true}
    cy.get('#sign-password').type(password, { force: true })

    // Verificar que el valor de la contraseña se haya ingresado correctamente
    cy.get('#sign-password').should('have.value', password)

    // Enviar el formulario
    cy.get('button[onclick="register()"]').click()

    // Validar el mensaje de éxito
    cy.on('window:alert', (alertMessage) => {
      expect(alertMessage).to.equal('Sign up successful.')
    })

    // Registrar el usuario generado para futuras referencias (opcional)
    cy.log(`Usuario generado: ${uniqueUsername}`)
  })
})
