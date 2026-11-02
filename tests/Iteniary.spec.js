
// import { test, expect } from '../Fixture/TestSetup';
// import Itinerary from '../Pages/Iteniary.js'; 
// import LoginPage from '../Pages/LoginPage';
// import AssertionData from '../testdata/AssertionData.json';
// import { attachStepScreenshot } from '../utilities/screenshot';
// import { AppConfig } from '../testdata/AppConfig.js';

// test.describe('Iteniary Suite', () => {
//   let itineraryPage;
//   let loginPage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     itineraryPage = new Itinerary(page);

//     // 1. Login
//     await loginPage.gotoUrl(AppConfig.loginUrl);
//     await loginPage.login(AppConfig.username, AppConfig.password);

//     // 2. Navigate to the Itinerary page 
//     await itineraryPage.gotoItinerary();
//   });

//   test('Itinerary Test Case', async ({ page }) => {
//     // 3. Verify that we have successfully landed on the Itinerary URL
//     await test.step('Verify Itinerary Page URL', async () => {
//         await expect(page).toHaveURL(AssertionData.assertions[0].my_itinerary_url);
//         await attachStepScreenshot(page, 'My Itinerary Page Loaded');
//     });

//     // 4. Perform any follow-up itinerary action defined in your page object
//     await itineraryPage.verifyItinerary();
//     await attachStepScreenshot(page, 'Verify Itinerary Action Complete');
//   });
// });

import { test, expect } from '../Fixture/TestSetup';
import Itinerary from '../Pages/Iteniary.js'; 
import LoginPage from '../Pages/LoginPage';
import AssertionData from '../testdata/AssertionData.json';
import { attachStepScreenshot } from '../utilities/screenshot';
import { AppConfig } from '../testdata/AppConfig.js';

test.describe('Itinerary Suite', () => {
  let itineraryPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    itineraryPage = new Itinerary(page);

    // 1. Login
    await loginPage.gotoUrl(AppConfig.loginUrl);
    await loginPage.login(AppConfig.username, AppConfig.password);

    // 2. Navigate to the Itinerary page 
    await itineraryPage.gotoItinerary();
  });

  // ==========================================
  // 1. POSITIVE TEST CASE (View & Return via Search)
  // ==========================================
  test('Itinerary Test Case and Return to Search', async ({ page }) => {
    await test.step('Verify Itinerary Page URL', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].my_itinerary_url);
        await attachStepScreenshot(page, 'My Itinerary Page Loaded');
    });

    // Perform itinerary action (Clicks search hotel button to return to search page)
    await itineraryPage.verifyItinerary();
    
    await test.step('Verify Return to Search Page', async () => {
        await expect(page).toHaveURL(/SearchHotel\.php/);
        await attachStepScreenshot(page, 'Returned to Search Page from Itinerary');
    });
  });

  // ==========================================
  // 2. ADDITIONAL ITINERARY VALIDATION TEST
  // ==========================================
  test('Verify Itinerary Table Elements Present', async ({ page }) => {
    await test.step('Verify Itinerary Page URL', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].my_itinerary_url);
    });

    await test.step('Check that booked itinerary table/elements exist', async () => {
        // Verify that the main itinerary table form or elements are visible on the page
        const itineraryTable = page.locator('#booked_form');
        await expect(itineraryTable).toBeVisible();
        await attachStepScreenshot(page, 'Itinerary Table Verified');
    });
  });
});