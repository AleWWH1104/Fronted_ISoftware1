import { test, expect } from '@playwright/test';

//Prueba de integración, verificar que, tras una autenticación exitosa (isAuthenticated = true), se navega a /home.
test('Redirección a /home tras autenticación exitosa', async ({ page }) => {
  // Interceptamos la solicitud POST para simular un login exitoso
  await page.route('**/auth/login', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'fake-token', user: { name: 'Iris' } })
    });
  });

  // Navegamos a la página de login
  await page.goto('http://localhost:5173/login');

  // Llenamos el formulario
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Hacemos submit
  await page.click('button:has-text("Ingresar")');

  // Esperamos la redirección
  await page.waitForURL('**/home', { timeout: 3000 });

  // Validamos que la nueva ruta sea /home
  expect(page.url()).toContain('/home');
});
