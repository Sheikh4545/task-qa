// import SelectHotel from '../Pages/SelectHotel';
// import SearchHotel from '../Pages/SearchHotel';
// import LoginPage from '../Pages/LoginPage';
// import SearchData from '../testdata/SearchData.json';
// import { test, expect } from '../Fixture/TestSetup';
// import { attachStepScreenshot } from '../utilities/screenshot';
// import AssertionData from '../testdata/AssertionData.json';
// import { AppConfig } from '../testdata/AppConfig.js';

// test.describe('Select Hotel Suite', () => {
//   let selectHotelPage;
//   let searchHotelPage;
//   let loginPage;
//   let selectData;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     searchHotelPage = new SearchHotel(page);
//     selectHotelPage = new SelectHotel(page);
//     selectData = SearchData.ValidUser[0];

//      await loginPage.gotoUrl();
//      await loginPage.login(AppConfig.username, AppConfig.password);

//     await searchHotelPage.searchHotel(
//       selectData.searchLocation,
//       selectData.searchHotel,
//       selectData.searchRoomType,
//       selectData.searchNumberOfRooms,
//       selectData.searchCheckInDate,
//       selectData.searchCheckOutDate,
//       selectData.searchAdultsPerRoom,
//       selectData.searchChildrenPerRoom
//     );
//   });

//   test('Select Hotel Test Case', async ({ page }) => {
  
//     await selectHotelPage.selectHotel(
//       selectData.selectHotelRadioButton,
//       selectData.continueButton
//     );

//     await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
//     await attachStepScreenshot(page, 'Select Hotel Successful');
//   });
// });



import SelectHotel from '../Pages/SelectHotel';
import SearchHotel from '../Pages/SearchHotel';
import LoginPage from '../Pages/LoginPage';
import Logout from '../Pages/Logout';
import SearchData from '../testdata/SearchData.json';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig.js';

test.describe('Select Hotel Suite', () => {
  let selectHotelPage;
  let searchHotelPage;
  let loginPage;
  let logout;
  let selectData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    searchHotelPage = new SearchHotel(page);
    selectHotelPage = new SelectHotel(page);
    logout = new Logout(page);
    selectData = SearchData.ValidUser[0];

    // Setup: Login and perform search to reach the Select Hotel page
    await loginPage.gotoUrl();
    await loginPage.login(AppConfig.username, AppConfig.password);

    await searchHotelPage.searchHotel(
      selectData.searchLocation,
      selectData.searchHotel,
      selectData.searchRoomType,
      selectData.searchNumberOfRooms,
      selectData.searchCheckInDate,
      selectData.searchCheckOutDate,
      selectData.searchAdultsPerRoom,
      selectData.searchChildrenPerRoom
    );

    // Ensure we successfully reached the SelectHotel page before individual tests start
    await expect(page).toHaveURL(/SelectHotel\.php/);
  });

  test.afterEach(async ({ page }) => {
    const currentUrl = page.url();
    if (currentUrl.includes('BookHotel.php') || currentUrl.includes('SelectHotel.php') || currentUrl.includes('SearchHotel.php')) {
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
  test('Select Hotel Test Case with Valid Selection', async ({ page }) => {
    await selectHotelPage.selectHotel();

    await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
    await attachStepScreenshot(page, 'Select Hotel Successful');
  });

  // ==========================================
  // 2. NEGATIVE TEST CASE
  // ==========================================
  test('Select Hotel Test Case Without Selecting Radio Button', async ({ page }) => {
    await test.step('Click Continue without selecting a hotel', async () => {
      // Directly click continue without checking the radio button
      await selectHotelPage.continueButton.click();
      await attachStepScreenshot(page, 'Continue Clicked Without Selection');
    });

    await test.step('Verify Selection Error & Stay on Select Hotel Page', async () => {
      // Assert that we did NOT advance to the booking page
      await expect(page).not.toHaveURL(AssertionData.assertions[0].book_hotel_url);
      
      // Assert that we stayed on the selection page
      await expect(page).toHaveURL(/SelectHotel\.php/);
      await attachStepScreenshot(page, 'Select Hotel Failed - No Hotel Selected');
    });
  });
});