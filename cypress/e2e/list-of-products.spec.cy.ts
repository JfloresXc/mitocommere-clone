describe('Product List Page', () => {
  const API_URL = 'https://eccommerce-api-p29d.onrender.com/api/products';

  it('should show mulple product', () => {
    cy.get('app-product-card').should('have.length', 3);
  });

  it('should display a list of products on load', () => {
    // 1. Interceptar la llamada a la API ANTES de visitar la página
    cy.intercept('GET', `${API_URL}`, { fixture: 'products.json' }).as('getProducts');

    // 2. Visitar la página, lo que disparará la llamada a la API
    cy.visit('/products');

    // 3. Esperar a que la llamada interceptada se complete
    cy.wait('@getProducts');

    // Verificar que los productos se rendericen correctamente
    cy.get('app-product-card').should('have.length', 3);
    cy.get('app-product-card').first().contains('Laptop Gamer');
  });

  it('should display filtered products when searching', () => {
    const searchTerm = 'Laptop';
    // 1. Interceptar la llamada a la API con el término de búsqueda
    cy.intercept('GET', `${API_URL}?search=${searchTerm}`, {
      fixture: 'filtered-products.json',
    }).as('getFilteredProducts');

    // 2. Visitar la página con el parámetro de búsqueda
    cy.visit(`/products?search=${searchTerm}`);

    // 3. Esperar a que la llamada a la API se complete
    cy.wait('@getFilteredProducts');

    // Verificar que solo se muestren los productos filtrados
    cy.get('app-product-card').should('have.length', 1);
    cy.get('app-product-card').first().contains('Laptop Gamer');
  });

  it('should display a message when no products are found', () => {
    // 1. Interceptar la llamada y devolver una respuesta vacía
    cy.intercept('GET', `${API_URL}`, { data: [] }).as('getEmptyProducts');

    // 2. Visitar la página
    cy.visit('/products');

    // 3. Esperar a que la llamada se complete
    cy.wait('@getEmptyProducts');

    // Verificar que no se muestre ningún producto
    cy.get('app-product-card').should('not.exist');
  });

  it('should handle API errors gracefully', () => {
    // 1. Interceptar la llamada y forzar un error 500
    cy.intercept('GET', `${API_URL}`, {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('getProductsError');

    // 2. Visitar la página
    cy.visit('/products');

    // 3. Esperar a que la llamada falle
    cy.wait('@getProductsError');

    // Verificar que no se muestren productos
    cy.get('app-product-card').should('not.exist');
  });
});
