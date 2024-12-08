/// <reference types="cypress" />

/**
 * Caso de prueba: LOG-001
 * Descripción: Validar que un usuario registrado pueda autenticarse con credenciales válidas utilizando la API.
 * Precondiciones:
 *  - El endpoint de login debe estar disponible en `https://api.demoblaze.com/login`.
 *  - Las credenciales del usuario deben ser válidas y la contraseña codificada en base64.
 * Resultados esperados:
 *  - El sistema debe responder con un código de estado 200.
 *  - La respuesta debe contener un token de autenticación o datos del usuario.
 */

describe('Validación de inicio de sesión API', () => {
  it('LOG-001 | Validación de login con credenciales válidas', () => {
    // Datos de usuario registrado
    const loginData = {
      username: 'amaringonz',
      password: btoa('amaringonz123') // Codifica la contraseña en base64
    }

    // Endpoint del login
    const apiUrl = 'https://api.demoblaze.com/login'

    // Enviar solicitud POST al endpoint de login
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: {
        Accept: '*/*'
      },
      body: loginData,
      failOnStatusCode: false // Para manejar errores manualmente
    }).then((response) => {
      // Validar el código de estado
      expect(response.status).to.eq(200)

      // Extraer el token de la respuesta
      const authToken = response.body.match(/Auth_token: (\S+)/)[1] // Usar expresión regular para extraer el token

      // Validar que el token existe y es una cadena
      expect(authToken).to.be.a('string')

      // Registrar el token para futuras pruebas (opcional)
      cy.log(`Token recibido: ${authToken}`)
    })
  })
})
