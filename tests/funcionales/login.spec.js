import { test, expect } from '@playwright/test';

// Prueba de integración, verificar que, tras una autenticación exitosa (isAuthenticated = true), se navega a /home.
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

// Prueba de regresión visual, Captura de errores visibles con credenciales incorrectas
test('Mostrar errores cuando las credenciales son incorrectas', async ({ page }) => {
  // Simulamos error del backend
  await page.route('**/auth/login', async route => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Credenciales incorrectas' })
    });
  });

  await page.goto('http://localhost:5173/login');

  // Llenamos el formulario
  await page.fill('input[name="email"]', 'fail@example.com');
  await page.fill('input[name="password"]', 'wrongpass');

  await page.click('button:has-text("Ingresar")');

  // Esperamos el mensaje de error
  const error = await page.locator('text=Credenciales incorrectas');

  await expect(error).toBeVisible();

  // Captura visual opcional para regresión visual
  await page.screenshot({ path: 'tests/funcionales/screenshots/login-error.png', fullPage: true });
});

// ✅ Prueba funcional: Mostrar mensajes de error si los campos están vacíos
test('Mostrar errores si los campos están vacíos al hacer submit', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  // Nos aseguramos de que los campos estén vacíos (opcional si ya están por defecto)
  await page.fill('input[name="email"]', '');
  await page.fill('input[name="password"]', '');

  // Hacemos submit sin llenar los campos
  await page.click('button:has-text("Ingresar")');

  // Verificamos que los mensajes de error se muestren
  const emailError = page.locator('text=El correo es obligatorio');
  const passwordError = page.locator('text=La contraseña es obligatoria');

  await expect(emailError).toBeVisible();
  await expect(passwordError).toBeVisible();
});
