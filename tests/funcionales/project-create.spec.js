// tests/funcionales/project-create.spec.js
import { test, expect } from '@playwright/test';

test.describe('Integración - Creación de Proyectos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/proyectos'); // Ajusta si usas otra ruta
  });

  test('Crea correctamente un nuevo proyecto', async ({ page }) => {
    // 1️⃣ Abre el popup de creación
    await page.getByRole('button', { name: /nuevo proyecto/i }).click();

    // Espera que se muestre el formulario
    await expect(page.getByText('Crear nuevo proyecto')).toBeVisible();

    // 2️⃣ Rellena los campos del proyecto
    await page.getByPlaceholder('Ingrese el nombre del proyecto').fill('Proyecto Laguna Azul');
    await page.locator('select').first().selectOption('Piscina Regular');
    await page.getByPlaceholder('Ingrese la ubicación').fill('San Pedro Sula');
    await page.locator('select').nth(1).selectOption('Solicitado');
    await page.getByPlaceholder('0').fill('50000');

    // 3️⃣ Selecciona un cliente existente
    const clienteSelect = page.locator('select').filter({ hasText: 'Selecciona un cliente' });
    await clienteSelect.selectOption({ index: 1 }); // Selecciona el primero disponible

    // 4️⃣ Guarda el proyecto
    await page.getByRole('button', { name: /guardar/i }).click();

    // 5️⃣ Espera confirmación visual o actualización de tabla
    await page.waitForTimeout(1000);
    const table = page.locator('.rdt_TableRow');
    await expect(table).toContainText('Proyecto Laguna Azul');
  });

});
