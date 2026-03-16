import { test, expect, Page } from '@playwright/test';

const TEST_EMAIL = process.env['TEST_EMAIL'] ?? 'admin@reacterial.com';
const TEST_PASSWORD = process.env['TEST_PASSWORD'] ?? 'admin123';

async function login(page: Page): Promise<void> {
  await page.goto('/login');
  await page.fill('[placeholder="Email"]', TEST_EMAIL);
  await page.fill('[placeholder="Password"]', TEST_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin', { timeout: 10000 });
}

test.describe('Reacterial Smoke Tests', () => {
  test('1. landing page loads and shows hero heading', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /Discover the Power of Reacterial/i })
    ).toBeVisible();
  });

  test('2. login with valid credentials redirects to dashboard', async ({
    page,
  }) => {
    await login(page);
    expect(page.url()).toContain('/admin');
  });

  test('3. dashboard renders after login', async ({ page }) => {
    await login(page);
    await expect(
      page.getByRole('heading', { name: 'Dashboard', exact: true })
    ).toBeVisible();
  });

  test('4. profile page loads after login', async ({ page }) => {
    await login(page);
    await page.goto('/admin/profile');
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
  });

  test('5. unauthenticated access to /admin redirects to login', async ({
    page,
  }) => {
    await page.goto('/admin');
    await page.waitForURL('**/login', { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });
});
