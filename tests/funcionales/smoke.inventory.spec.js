import { test, expect } from '@playwright/test';

test('Humo - Estado general de materiales', async ({ page }) => {
  // Interceptar cualquier request que termine en /estado_materiales
  await page.route(/.*\/estado_materiales$/, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          codigo: 'MAT001',
          nombre_material: 'Acero',
          en_bodega: 50,
          reservado: 10,
          nivel_stock: 'Alto'
        }
      ])
    })
  );

  await page.goto('http://localhost:5173/inventory');

  // Esperar a que la tabla esté visible
  const row = page.locator('.rdt_TableRow'); // Ajusta el selector según la estructura HTML

  // Usar waitForSelector para esperar a que el elemento esté presente
  await page.waitForSelector('.rdt_TableRow', { timeout: 10000 });

  // Ahora verifica que la fila sea visible
  await expect(row).toBeVisible({ timeout: 10000 });

  // Esperar explícitamente a que la tabla renderice la fila
  await expect(row).toHaveCount(1, { timeout: 10000 });

  // Confirmar que el contenido coincide con los datos mockeados
  await expect(row.first()).toContainText('Acero');
});
