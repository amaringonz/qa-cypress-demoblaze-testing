/// <reference types="cypress" />

/**
 * Caso de prueba: PAY-001
 * Descripción: Validar el proceso de pago simulado utilizando datos válidos.
 * Precondiciones:
 *  - La página principal debe ser accesible.
 *  - El producto debe poder agregarse correctamente al carrito.
 *  - El formulario de pago debe estar funcional.
 * Resultados esperados:
 *  - El sistema debe procesar el pago correctamente y mostrar una confirmación de éxito.
 */

describe('Proceso de pago simulado', () => {
  it('PAY-001 | Validación del proceso de pago simulado', () => {
    // Acceder a la página principal
    cy.visit('/')

    // Agregar un producto al carrito
    cy.get('.card-title') // Selector del título del producto
      .contains('Samsung galaxy s6') // Producto específico
      .click()
    cy.get('.btn-success')
      .contains('Add to cart')
      .click()

    // Validar la alerta de confirmación
    cy.on('window:alert', (alertMessage) => {
      expect(alertMessage).to.equal('Product added')
    })

    // Ir al carrito
    cy.get('#cartur').click()

    // Verificar que el producto está en el carrito
    cy.get('.success')
      .should('be.visible')
      .and('contain', 'Samsung galaxy s6')

    // Proceder con la compra
    cy.get('.btn-success') // Botón "Place Order"
      .contains('Place Order')
      .click()

    // Completar el formulario de pago
    cy.get('#name').type('Juan Pérez', { force: true })
    cy.get('#country').type('Costa Rica', { force: true })
    cy.get('#city').type('San José', { force: true })
    cy.get('#card').type('4111111111111111', { force: true })
    cy.get('#month').type('12', { force: true })
    cy.get('#year').type('2025', { force: true })

    // Confirmar la compra
    cy.get('button[onclick="purchaseOrder()"]').click()

    // Validar la confirmación de la compra
    cy.get('.sweet-alert')
      .should('be.visible')
      .and('contain', 'Thank you for your purchase!')
  })
})
