import { test, expect } from '@playwright/test';

function random_username(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  //add optionally 0123456789
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const username = random_username(10)
const main_page = process.env.DEPLOYMENT_URL!


test('test', async ({ page }) => {
  await page.goto(main_page);
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('First name').click();
  await page.getByLabel('First name').fill('FirstName');
  await page.getByLabel('Last name').click();
  await page.getByLabel('Last name').fill('LastName');
  await page.locator('#username').click();
  await page.locator('#username').fill(username);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('passWORD***12');
  await page.getByRole('button', { name: 'Create an account' }).click();
  await page.getByRole('link', { name: 'My Profile' }).click();

  await expect(page.getByText('Your username is: ' + username)).toBeVisible()

  await page.getByRole('button', { name: 'Log Out' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('username').click();
  await page.getByPlaceholder('username').fill(username);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('passWORD***12');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'My Profile' }).click();

  await expect(page.getByText('Your username is: ' + username)).toBeVisible()

  await page.getByRole('link', { name: 'Back to Main Page' }).click();
  await page.getByRole('link', { name: 'My Profile' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  await expect(page.getByRole('link', { name: 'My Profile' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page.url()).toBe(main_page)
});