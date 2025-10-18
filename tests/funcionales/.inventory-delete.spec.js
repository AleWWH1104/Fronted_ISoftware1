import { test, expect } from '@playwright/test';

test.describe('Integración - Eliminación de Materiales', () => {
  test('Elimina correctamente un material del inventario', async ({ page }) => {

    // 1️⃣ Simulamos el endpoint de carga inicial
    await page.route('**/estado_materiales', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id_material: 1, codigo: 'MAT001', nombre_material: 'Madera', en_bodega: 20, reservado: 2, disponible: 18, nivel_stock: 'Medio' },
          { id_material: 2, codigo: 'MAT002', nombre_material: 'Acero', en_bodega: 50, reservado: 5, disponible: 45, nivel_stock: 'Alto' },
        ])
      });
    });

    // 2️⃣ Interceptamos el endpoint que elimina materiales
    await page.route('**/eliminar_material/1', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Material eliminado correctamente' })
      });
    });

    // 3️⃣ Navegamos al inventario
    await page.goto('http://localhost:5173/inventory');

    // 4️⃣ Verificamos que hay 2 filas inicialmente
    const rows = page.locator('.rdt_TableRow');
    await expect(rows).toHaveCount(2);
    await expect(rows.first()).toContainText('Madera');

    // 5️⃣ Simulamos click en el botón de eliminar (primer material)
    const deleteButtons = page.locator('button[title="Eliminar"]');
    await deleteButtons.first().click();

    // 6️⃣ Confirmamos el diálogo nativo (window.confirm)
    page.once('dialog', dialog => dialog.accept());

    // 7️⃣ Simulamos que luego del refetch, el backend devuelve solo 1 material
    await page.route('**/estado_materiales', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id_material: 2, codigo: 'MAT002', nombre_material: 'Acero', en_bodega: 50, reservado: 5, disponible: 45, nivel_stock: 'Alto' },
        ])
      });
    });

    // 8️⃣ Esperamos que se recargue la tabla
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Acero');
    await expect(rows.first()).not.toContainText('Madera');
  });
});
