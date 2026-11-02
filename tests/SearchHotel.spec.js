
// import LoginPage from '../Pages/LoginPage';
// import SearchHotel from '../Pages/SearchHotel';
// import SearchData from '../testdata/SearchData.json';
// import { test, expect } from '../Fixture/TestSetup';
// import { attachStepScreenshot } from '../utilities/screenshot';
// import AssertionData from '../testdata/AssertionData.json';

// test.describe('Search Hotel Suite', () => {
//   let searchHotelPage;
//   const sData = SearchData.ValidUser[0];

//   test.beforeEach(async ({ page }) => {
//     searchHotelPage = new SearchHotel(page);
//     await page.goto('https://adactinhotelapp.com/SearchHotel.php');
//   });

//   test('SearchHotel with valid data', async ({ page }) => {
//     await searchHotelPage.searchHotel(
//       sData.searchLocation,
//       sData.searchHotel,
//       sData.searchRoomType,
//       sData.searchNumberOfRooms,
//       sData.searchCheckInDate,
//       sData.searchCheckOutDate,
//       sData.searchAdultsPerRoom,
//       sData.searchChildrenPerRoom
//     );
//     await expect(page).toHaveURL(AssertionData.assertions[0].select_hotel_url);
//     await attachStepScreenshot(page, 'Search Page loaded');
//   });
// });
import LoginPage from '../Pages/LoginPage';
import SearchHotel from '../Pages/SearchHotel';
import Logout from '../Pages/Logout';
import SearchData from '../testdata/SearchData.json';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig.js';

test.describe('Search Hotel Suite', () => {
  let loginPage;
  let searchHotelPage;
  let logout;
  const sData = SearchData.ValidUser[0];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    searchHotelPage = new SearchHotel(page);
    logout = new Logout(page);

    await loginPage.gotoUrl();
    await loginPage.login(AppConfig.username, AppConfig.password);
  });

  test.afterEach(async ({ page }) => {
    const currentUrl = page.url();
    if (currentUrl.includes('SelectHotel.php') || currentUrl.includes('SearchHotel.php')) {
      try {
        await logout.performLogout();
      } catch (e) {
        // Ignore logout error if already logged out
      }
    }
  });

  // ==========================================
  // 1. POSITIVE TEST CASE
  // ==========================================
  test('SearchHotel with valid data', async ({ page }) => {
    await searchHotelPage.searchHotel(
      sData.searchLocation,
      sData.searchHotel,
      sData.searchRoomType,
      sData.searchNumberOfRooms,
      sData.searchCheckInDate,
      sData.searchCheckOutDate,
      sData.searchAdultsPerRoom,
      sData.searchChildrenPerRoom
    );
    await expect(page).toHaveURL(AssertionData.assertions[0].select_hotel_url);
    await attachStepScreenshot(page, 'Search Page loaded');
  });

  // ==========================================
  // 2. NEGATIVE TEST CASES
  // ==========================================
  test('SearchHotel with Check-Out Date before Check-In Date', async ({ page }) => {
    await test.step('Search with invalid chronological dates', async () => {
      await searchHotelPage.searchHotel(
        sData.searchLocation,
        sData.searchHotel,
        sData.searchRoomType,
        sData.searchNumberOfRooms,
        '25/10/2026', // Check-In Date
        '20/10/2026', // Check-Out Date (Earlier than check-in!)
        sData.searchAdultsPerRoom,
        sData.searchChildrenPerRoom
      );
    });

    await test.step('Verify Search Failure & Stay on Search Page', async () => {
      await expect(page).not.toHaveURL(AssertionData.assertions[0].select_hotel_url);
      await expect(page).toHaveURL(/SearchHotel\.php/);
      await attachStepScreenshot(page, 'Search Failed - Invalid Dates Order');
    });
  });

  test('SearchHotel with Empty Check-In Date', async ({ page }) => {
    await test.step('Search with an empty check-in date', async () => {
      await searchHotelPage.searchHotel(
        sData.searchLocation,
        sData.searchHotel,
        sData.searchRoomType,
        sData.searchNumberOfRooms,
        '',           // Empty Check-In Date (Mandatory field missing)
        sData.searchCheckOutDate,
        sData.searchAdultsPerRoom,
        sData.searchChildrenPerRoom
      );
    });

    await test.step('Verify Search Failure and Stay on Search Page', async () => {
      // Assert that we did not navigate to the select hotel page
      await expect(page).not.toHaveURL(AssertionData.assertions[0].select_hotel_url);
      
      // Assert that Adactin successfully blocked it and kept us on the search page
      await expect(page).toHaveURL(/SearchHotel\.php/);

      await attachStepScreenshot(page, 'Search Failed - Empty Check-In Date');
    });
  });
});