/// <reference types="cypress" />

/**
 * Caso de prueba: CART-002
 * Descripción: Validar que un producto agregado al carrito pueda eliminarse correctamente.
 * Precondiciones:
 *  - La página principal debe ser accesible.
 *  - El producto debe poder agregarse al carrito.
 *  - El carrito debe permitir eliminar productos.
 * Resultados esperados:
 *  - El producto se elimina correctamente del carrito.
 *  - El carrito muestra un mensaje de vacío o no contiene productos.
 */

describe('Eliminar producto del carrito', () => {
  it('CART-002 | Validación de eliminación de producto del carrito', () => {
    // Acceder a la página principal
    cy.visit('/')

    // Agregar un producto al carrito
    cy.get('.card-title') // Selector del título del producto
      .contains('Samsung galaxy s6') // Producto específico
      .click()
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

    // Eliminar el producto del carrito
    cy.get('.success') // Selector de la fila del producto
      .contains('Delete')
      .click()

    // Verificar que el carrito está vacío
    cy.get('.success').should('not.exist') // Verifica que no hay productos
  })
})
