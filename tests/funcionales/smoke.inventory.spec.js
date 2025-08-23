import { test, expect } from '@playwright/test';

test.describe('Humo - Estado general de materiales', () => {
  test('Carga datos desde el endpoint y muestra al menos 1 fila', async ({ page }) => {
    // Mock robusto del endpoint
    await page.route(/\/estado_materiales(\?.*)?$/, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { codigo: 'MAT001', nombre_material: 'Acero', en_bodega: 50, reservado: 10, nivel_stock: 'Alto' }
        ])
      });
    });

    // Opcional: logging de requests
    page.on('request', req => {
      if (req.method() === 'GET') console.log('GET ->', req.url());
    });

    // Navega y espera a que llegue la data
    const waitData = page.waitForResponse(res =>
      res.url().match(/\/estado_materiales(\?.*)?$/) && res.status() === 200
    );
    await page.goto('http://localhost:5173/inventario');
    await waitData;

    // Verifica que al menos haya una fila
    const rows = page.locator('.rdt_TableRow');
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    // Check rápido de contenido
    await expect(rows.first()).toContainText('Acero');
  });
});
