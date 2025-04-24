import { test, expect } from '@playwright/test';

// Store credentials in variables for easy maintenance
const EMAIL = 'shuhaib.ali@parkly.no';
const PASSWORD = 'Shuhaib12345';
const BASE_URL = 'https://parkly-dev-admin-portal.azurewebsites.net';
const LOGIN_URL = 'https://parkly-dev-admin-portal.azurewebsites.net/#/login';

// Reusable login function
async function login(page) {
  await page.goto(LOGIN_URL);
  
  // Wait for redirect to the Azure B2C login page
  await page.waitForURL(url => url.href.includes('login-dev.parkly.no'));
  
  // Fill in login credentials
  await page.getByRole('textbox', { name: 'Email Address' }).fill(EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // Wait for successful login and redirection to home page
  await page.waitForURL(`${BASE_URL}/home`);
}

test.describe('Parkly Admin Portal - Tjenester (Services) Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Navigate to Tjenester page', async ({ page }) => {
    // Navigate to Tjenester page from the sidebar
    await page.getByRole('link', { name: 'Tjenester' }).click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(`${BASE_URL}/contracts/parking-services`);
    await expect(page.getByRole('heading', { name: 'Tjenester', level: 1 })).toBeVisible();
    
    // Verify the table headers are present
    await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Tjeneste' })).toBeVisible();
  });

  test('Search for a service', async ({ page }) => {
    // Navigate to Tjenester page
    await page.getByRole('link', { name: 'Tjenester' }).click();
    
    // Use the search functionality
    await page.getByRole('searchbox').fill('Test');
    
    // Verify search results (assuming there's at least one service with "Test" in the name)
    await expect(page.getByRole('cell', { name: 'Test', exact: false })).toBeVisible();
  });
});
