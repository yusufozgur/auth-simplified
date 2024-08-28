import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto("/");
  await page.getByRole('link', { name: 'Component Prototype Page' }).click();


  await expect(page.getByPlaceholder('username')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()

  await page.getByRole('button', { name: 'signup' }).click();
  await expect(page.getByRole('button', { name: 'Create an account' })).toBeVisible()

  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()

});