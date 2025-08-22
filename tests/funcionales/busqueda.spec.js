import { test, expect } from '@playwright/test';

test.describe('Prueba de integración - Búsqueda en Inventario', () => {
  test('La tabla se actualiza al buscar un material', async ({ page }) => {
    // Simular el endpoint con algunos materiales
    await page.route('**/estado_materiales', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { codigo: 'MAT001', nombre_material: 'Acero', en_bodega: 50, reservado: 10, nivel_stock: 'Alto' },
          { codigo: 'MAT002', nombre_material: 'Madera', en_bodega: 30, reservado: 5, nivel_stock: 'Medio' },
          { codigo: 'MAT003', nombre_material: 'Plástico', en_bodega: 20, reservado: 2, nivel_stock: 'Bajo' }
        ])
      });
    });

    // Abrir la vista de inventario
    await page.goto('http://localhost:5173/inventario');

    // Verificar que la tabla muestra los 3 registros inicialmente
    const rows = page.locator('.rdt_TableRow');
    await expect(rows).toHaveCount(3);

    // Escribir en el campo de búsqueda
    await page.fill('input[type="text"]', 'Madera');

    // Verificar que solo se muestra el material buscado
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Madera');
  });
});
