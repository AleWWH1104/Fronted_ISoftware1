import { test, expect } from '@playwright/test';

test.describe('Integración - Búsqueda en Inventario', () => {
  test('La tabla se actualiza al buscar un material', async ({ page }) => {
    // Intercepta cualquier URL que termine en /estado_materiales (con o sin query)
    await page.route(/\/estado_materiales(\?.*)?$/, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { codigo: 'MAT001', nombre_material: 'Acero',   en_bodega: 50, reservado: 10, nivel_stock: 'Alto' },
          { codigo: 'MAT002', nombre_material: 'Madera',  en_bodega: 30, reservado:  5, nivel_stock: 'Medio' },
          { codigo: 'MAT003', nombre_material: 'Plástico',en_bodega: 20, reservado:  2, nivel_stock: 'Bajo'  }
        ])
      });
    });

    // Opcional: log para ver qué se está pidiendo
    page.on('request', req => {
      if (req.method() === 'GET') console.log('GET ->', req.url());
    });

    // Navega y espera a que la respuesta del endpoint llegue
    const waitData = page.waitForResponse(res =>
      res.url().match(/\/estado_materiales(\?.*)?$/) && res.status() === 200
    );
    await page.goto('http://localhost:5173/inventario');
    await waitData;

    // react-data-table-component pinta .rdt_TableRow por fila
    const rows = page.locator('.rdt_TableRow');
    await expect(rows).toHaveCount(3);

    // Busca "Madera"
    // (El input no tiene label/placeholder, así que tomamos el textbox dentro de la sección de Inventario)
    const inventorySection = page.locator('section:has(h2:has-text("Estado general de materiales"))');
    await inventorySection.getByRole('textbox').fill('Madera');

    // Debe quedar 1 fila y contener "Madera" únicamente
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Madera');
    await expect(rows.first()).not.toContainText('Acero');
    await expect(rows.first()).not.toContainText('Plástico');
  });
});
