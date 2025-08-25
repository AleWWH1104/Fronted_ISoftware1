import { test, expect } from '@playwright/test';

test.describe('Integración - Búsqueda en Inventario', () => {
  test('Filtra la tabla al escribir en el campo de búsqueda', async ({ page }) => {
    await page.route('**/estado_materiales', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { codigo: 'MAT001', nombre_material: 'Madera', en_bodega: 20, reservado: 2, nivel_stock: 'Medio' },
          { codigo: 'MAT002', nombre_material: 'Acero', en_bodega: 50, reservado: 5, nivel_stock: 'Alto' },
          { codigo: 'MAT003', nombre_material: 'Cemento', en_bodega: 100, reservado: 0, nivel_stock: 'Alto' },
        ])
      });
    });

    // 👇 URL completa
    await page.goto('http://localhost:5173/inventory');

    const rows = page.locator('.rdt_TableRow');
    await expect(rows).toHaveCount(3);

    const input = page.locator('input[type="text"]');
    await input.fill('Madera');

    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Madera');
  });
});