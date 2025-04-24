# Test info

- Name: Parkly Admin Portal - Tjenester (Services) Tests >> Create a new service
- Location: C:\Users\ShuhaibA\Desktop\parkly-tests\tests\tjenester.spec.ts:55:7

# Error details

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('treeitem', { name: 'Parkly As' }).getByRole('checkbox')

    at C:\Users\ShuhaibA\Desktop\parkly-tests\tests\tjenester.spec.ts:69:83
```

# Page snapshot

```yaml
- banner:
  - link:
    - /url: /
    - img
  - button "cog-double-2 Admin":
    - img "cog-double-2"
    - text: Admin
  - button "Parkly AS":
    - img
    - text: Parkly AS
  - button "Shuhaib Azmee":
    - img
    - text: Shuhaib Azmee
- navigation:
  - link "Hjem":
    - /url: /home
  - link "Bileiere":
    - /url: /legal-user
    - img
    - text: Bileiere
  - link "Brukere":
    - /url: /parkly-user
    - img
    - text: Brukere
  - link "Parkeringsplasser":
    - /url: /parking-lots
    - img
    - text: Parkeringsplasser
  - link "Parkeringseiere":
    - /url: /parking-lot-owners
    - img
    - text: Parkeringseiere
  - link "Servicebiler":
    - /url: /service-cars
    - img
    - text: Servicebiler
  - link "Administratorer":
    - /url: /administrators
    - img
    - text: Administratorer
  - heading "Kontraktsparkering" [level=5]
  - link "Tjenester":
    - /url: /contracts/parking-services
    - img
    - text: Tjenester
  - link "Personer":
    - /url: /contracts/parking-permits
    - img
    - text: Personer
  - heading "Lading" [level=5]
  - link "Selskap":
    - /url: /business-company
    - img
    - text: Selskap
  - link "Ladelokasjoner":
    - /url: /charging-locations
    - img
    - text: Ladelokasjoner
  - heading "Inventar" [level=5]
  - link "Produkter":
    - /url: /inventory/products
  - link "Utstyr":
    - /url: /inventory/equipments
  - link "Feilregistreringer":
    - /url: /failed-registration
    - img
    - text: Feilregistreringer
  - heading "Økonomi" [level=5]
  - link "Avstemming":
    - /url: /balance
  - link "Økonomiarbeid":
    - /url: /reconciliation
  - link "Fakturaer":
    - /url: /reports/invoice-summary
  - link "Betalingsmetode":
    - /url: /reports/turnover-reports
  - link "Produkt":
    - /url: /reports/turnover-per-product-reports
  - heading "Rapporter" [level=5]
  - img
  - text: Økonomi
  - img
  - text: Usage Reports
- main:
  - heading "Tjenester" [level=1]
  - text: Navn
  - textbox "Navn": Test Service 1745210337454
  - text: Gyldig periode For sesongkort og andre tidsbegrensede tillatelser
  - checkbox "Mandag til søndag" [checked] [disabled]: ✓
  - text: Mandag til søndag Velg operatør eller parkeringseiere
  - textbox
  - img
  - tree:
    - group:
      - img
      - checkbox
      - text: Parkly AS
      - list:
        - treeitem "MicrosoftParkings" [expanded]:
          - checkbox
          - text: MicrosoftParkings
        - treeitem "Shu Stores" [expanded]:
          - checkbox
          - text: Shu Stores
        - treeitem "Shuhaib Stores" [expanded]:
          - checkbox
          - text: Shuhaib Stores
        - treeitem "QA Corp" [expanded]:
          - checkbox
          - text: QA Corp
        - treeitem "Kragerø Parkering AS" [expanded]:
          - checkbox
          - text: Kragerø Parkering AS
        - treeitem "QA Test" [expanded]:
          - checkbox
          - text: QA Test
        - treeitem "Ola Brun Stores" [expanded]:
          - checkbox
          - text: Ola Brun Stores
        - treeitem "Kamal Org" [expanded]:
          - checkbox
          - text: Kamal Org
        - treeitem "SHU Test" [expanded]:
          - checkbox
          - text: SHU Test
        - treeitem "Kristin test eier" [expanded]:
          - checkbox
          - text: Kristin test eier
        - treeitem "Sondre tester" [expanded]:
          - checkbox
          - text: Sondre tester
  - button "Lagre"
- list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | // Store credentials in variables for easy maintenance
   4 | const EMAIL = 'shuhaib.ali@parkly.no';
   5 | const PASSWORD = 'Shuhaib12345';
   6 | const BASE_URL = 'https://parkly-dev-admin-portal.azurewebsites.net';
   7 | const LOGIN_URL = 'https://parkly-dev-admin-portal.azurewebsites.net/#/login';
   8 |
   9 | // Reusable login function
   10 | async function login(page) {
   11 |   await page.goto(LOGIN_URL);
   12 |   
   13 |   // Wait for redirect to the Azure B2C login page
   14 |   await page.waitForURL(url => url.href.includes('login-dev.parkly.no'));
   15 |   
   16 |   // Fill in login credentials
   17 |   await page.getByRole('textbox', { name: 'Email Address' }).fill(EMAIL);
   18 |   await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
   19 |   await page.getByRole('button', { name: 'Sign in' }).click();
   20 |   
   21 |   // Wait for successful login and redirection to home page
   22 |   await page.waitForURL(`${BASE_URL}/home`);
   23 | }
   24 |
   25 | test.describe('Parkly Admin Portal - Tjenester (Services) Tests', () => {
   26 |   
   27 |   test.beforeEach(async ({ page }) => {
   28 |     await login(page);
   29 |   });
   30 |
   31 |   test('Navigate to Tjenester page', async ({ page }) => {
   32 |     // Navigate to Tjenester page from the sidebar
   33 |     await page.getByRole('link', { name: 'Tjenester' }).click();
   34 |     
   35 |     // Verify we're on the correct page
   36 |     await expect(page).toHaveURL(`${BASE_URL}/contracts/parking-services`);
   37 |     await expect(page.getByRole('heading', { name: 'Tjenester', level: 1 })).toBeVisible();
   38 |     
   39 |     // Verify the table headers are present
   40 |     await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
   41 |     await expect(page.getByRole('columnheader', { name: 'Tjeneste' })).toBeVisible();
   42 |   });
   43 |
   44 |   test('Search for a service', async ({ page }) => {
   45 |     // Navigate to Tjenester page
   46 |     await page.getByRole('link', { name: 'Tjenester' }).click();
   47 |     
   48 |     // Use the search functionality
   49 |     await page.getByRole('searchbox').fill('Test');
   50 |     
   51 |     // Verify search results (assuming there's at least one service with "Test" in the name)
   52 |     await expect(page.getByRole('cell', { name: 'Test', exact: false })).toBeVisible();
   53 |   });
   54 |
   55 |   test('Create a new service', async ({ page }) => {
   56 |     // Navigate to Tjenester page
   57 |     await page.getByRole('link', { name: 'Tjenester' }).click();
   58 |     
   59 |     // Click on "Ny tjeneste" button
   60 |     await page.getByRole('button', { name: 'Ny tjeneste' }).click();
   61 |     
   62 |     // Verify we're on the create service page
   63 |     await expect(page).toHaveURL(`${BASE_URL}/contracts/parking-services/create`);
   64 |       // Fill in the service name
   65 |     const serviceName = `Test Service ${Date.now()}`;
   66 |     await page.getByRole('textbox', { name: 'Navn' }).fill(serviceName);
   67 |     
   68 |     // Select the main "Parkly As" checkbox in the tree
>  69 |     await page.getByRole('treeitem', { name: 'Parkly As' }).getByRole('checkbox').click();
      |                                                                                   ^ Error: locator.click: Test timeout of 60000ms exceeded.
   70 |     
   71 |     // Wait for a moment to ensure the checkbox state is registered
   72 |     await page.waitForTimeout(1000);
   73 |     
   74 |     // Save the service
   75 |     await page.getByRole('button', { name: 'Lagre' }).click();
   76 |     
   77 |     // Verify we're redirected back to the services list
   78 |     await expect(page).toHaveURL(`${BASE_URL}/contracts/parking-services`);
   79 |     
   80 |     // Verify success message
   81 |     await expect(page.getByRole('alertdialog', { name: 'Tjenesten er opprettet' })).toBeVisible();
   82 |     
   83 |     // Verify the new service appears in the list
   84 |     await expect(page.getByRole('cell', { name: serviceName })).toBeVisible();
   85 |   });
   86 |
   87 |   test('View service details', async ({ page }) => {
   88 |     // Navigate to Tjenester page
   89 |     await page.getByRole('link', { name: 'Tjenester' }).click();
   90 |
   91 |     await page.waitForTimeout(1000); // Wait for the table to load
   92 |     
   93 |     // Click on the first service in the list to view details
   94 |     await page.getByRole('row').nth(1).click();
   95 |     
   96 |     // Verify we're on the detail page (URL pattern might need adjustment)
   97 |     await expect(page.url()).toContain(`${BASE_URL}/contracts/parking-services/`);
   98 |     
   99 |     // Verify key elements are visible on the details page
  100 |     // Note: This will need to be adjusted based on the actual structure of the details page
  101 |     await expect(page.getByText('Tjeneste', { exact: false })).toBeVisible();
  102 |   });
  103 | });
  104 |
```