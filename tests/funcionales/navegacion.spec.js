import { test, expect } from '@playwright/test';

test.describe('Integración - Navegación global mantiene sesión', () => {
  test('Debe mantener autenticación al navegar entre rutas protegidas', async ({ page }) => {

    // 1. Mock de la API de login
    await page.route('**/auth/login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          token: 'fake-token-for-testing', 
          user: { 
            id: 1, 
            name: 'Usuario Test',
            email: 'usuario@test.com'
          }
        })
      });
    });

    // 2. Mock de la API de verify-token (para ProtectedRoutes)
    await page.route('**/auth/verify-token', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          user: { 
            id: 1, 
            name: 'Usuario Test',
            email: 'usuario@test.com'
          }
        })
      });
    });

    // 1. Ir al login
    await page.goto('http://localhost:5173/login');

    // 2. Hacer login real
    await page.fill('input[name="email"]', 'usuario@test.com');
    await page.fill('input[name="password"]', '123456');
    await page.click('button:has-text("Ingresar")');

    // 3. Esperar redirección al dashboard
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1.titulo')).toHaveText('Dashboard');

    // 4. Verificar que el estado de autenticación es correcto
    await expect(page.locator('text=Cerrar Sesión')).toBeVisible();

    // 5. Navegar al Inventario usando el sidebar
    await page.getByRole('link', { name: 'Inventario', exact: true }).click();
    await page.waitForURL('**/inventory');
    await expect(page.locator('h1.titulo')).toHaveText('Inventario');

    // 6. Confirmar que seguimos autenticados
    await expect(page.locator('text=Cerrar Sesión')).toBeVisible();
  });
});