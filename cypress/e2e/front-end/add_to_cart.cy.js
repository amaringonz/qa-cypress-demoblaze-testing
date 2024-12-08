/// <reference types="cypress" />

/**
 * Caso de prueba: CART-001
 * Descripción: Validar que un producto pueda ser agregado al carrito desde la página principal.
 * Precondiciones:
 *  - La página principal debe ser accesible.
 *  - Los productos deben estar listados correctamente en el catálogo.
 * Resultados esperados:
 *  - El sistema debe mostrar una alerta confirmando que el producto fue agregado.
 *  - El producto debe aparecer en el carrito con su precio correspondiente.
 */

describe('Agregar producto al carrito', () => {
  it('CART-001 | Validación de agregar producto al carrito', () => {
    // Acceder a la página principal
    cy.visit('/')

    // Seleccionar un producto de la lista
    cy.get('.card-title') // Selector del título del producto
      .contains('Samsung galaxy s6') // Producto específico
      .click()

    // Verificar que los detalles del producto son visibles
    cy.get('.name')
      .should('be.visible')
      .and('contain', 'Samsung galaxy s6')

    // Agregar el producto al carrito
    cy.get('.btn-success') // Botón "Add to cart"
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
  })
})
