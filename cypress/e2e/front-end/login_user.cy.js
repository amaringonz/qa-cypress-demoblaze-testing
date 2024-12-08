/// <reference types="cypress" />

/**
 * Caso de prueba: LOG-001
 * Descripción: Validar el inicio de sesión exitoso de un usuario registrado usando credenciales válidas.
 * Precondiciones:
 *  - La página principal debe ser accesible.
 *  - El modal de inicio de sesión debe cargarse correctamente al hacer clic en "Log in".
 * Resultados esperados:
 *  - El sistema debe autenticar al usuario y mostrar su nombre en el menú principal.
 */

describe('Validación de inicio de sesión', () => {
  it('LOG-001 | Validación de inicio de sesión con credenciales válidas', () => {
    // Datos de usuario registrado
    const username = 'amaringonz'
    const password = 'amaringonz123'

    // Acceder a la página principal usando baseUrl
    cy.visit('/')

    // Abrir el modal de inicio de sesión
    cy.get('#login2').click()

    // Verificar que el modal de inicio de sesión sea visible
    cy.get('#logInModal').should('be.visible')

    // Ingresar username y password utilizando { force: true }
    cy.get('#loginusername').type(username, { force: true })
    cy.get('#loginusername').should('have.value', username)

    cy.get('#loginpassword').type(password, { force: true })
    cy.get('#loginpassword').should('have.value', password)

    // Hacer clic en el botón "Log in"
    cy.get('button[onclick="logIn()"]').click()

    // Validar que el inicio de sesión fue exitoso
    cy.get('#nameofuser')
      .should('be.visible')
      .and('contain', `Welcome ${username}`) // Mensaje esperado en la interfaz
  })
})
