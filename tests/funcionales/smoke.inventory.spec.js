import { test, expect } from '@playwright/test';

test.describe('Prueba de humo - Estado general de materiales', () => {

  test('Carga de datos desde el endpoint y visualización en la tabla', async ({ page }) => {
    // Mock del endpoint /estado_materiales
    await page.route('**/estado_materiales', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { codigo: 'MAT001', nombre_material: 'Acero', en_bodega: 50, reservado: 10, nivel_stock: 'Alto' },
          { codigo: 'MAT002', nombre_material: 'Madera', en_bodega: 30, reservado: 5, nivel_stock: 'Medio' }
        ])
      });
    });

    // Ir a la vista que contiene InventoryView
    await page.goto('http://localhost:5173/inventario');

    // Esperar a que carguen filas de la tabla
    const rows = page.locator('table tbody tr');
    await expect(rows.first()).toBeVisible();

    // Validar que hay al menos una fila
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    // Validar que se renderizó un material esperado
    await expect(page.locator('text=Acero')).toBeVisible();
  });
});
