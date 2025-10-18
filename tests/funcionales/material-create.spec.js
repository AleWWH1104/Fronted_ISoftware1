
import { test, expect } from '@playwright/test';

test.describe('Integración - Creación de Materiales', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/inventario'); // Ajusta si usas otra ruta
  });

  test('Crea correctamente un nuevo material', async ({ page }) => {
    // 1️⃣ Abre el popup de creación de material
    await page.getByRole('button', { name: /nuevo material/i }).click();

    // Espera que aparezca el formulario
    await expect(page.getByText('Registrar nuevo material')).toBeVisible();

    // 2️⃣ Llena los campos
    await page.getByPlaceholder('Ingrese el nombre del material').fill('Arena Sílica');
    await page.getByPlaceholder('Ingrese la unidad de medida').fill('kg');
    await page.getByPlaceholder('Ingrese la cantidad inicial').fill('200');
    await page.getByPlaceholder('Ingrese el precio unitario').fill('35');

    // 3️⃣ Guarda el material
    await page.getByRole('button', { name: /guardar/i }).click();

    // 4️⃣ Verifica que el nuevo material aparezca en la tabla
    await page.waitForTimeout(1000);
    const table = page.locator('.rdt_TableRow');
    await expect(table).toContainText('Arena Sílica');
  });

});
