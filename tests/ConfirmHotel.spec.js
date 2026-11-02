

// import ConfirmHotel from '../Pages/ConfirmHotel';
// import LoginPage from '../Pages/LoginPage';
// import SearchHotel from '../Pages/SearchHotel';
// import SelectHotel from '../Pages/SelectHotel';
// import BookHotel from '../Pages/BookHotel';
// import SearchData from '../testdata/SearchData.json';
// import BookData from '../testdata/BookData.json';
// import { test, expect } from '../Fixture/TestSetup';
// import { attachStepScreenshot } from '../utilities/screenshot';
// import AssertionData from '../testdata/AssertionData.json';
// import { AppConfig } from '../testdata/AppConfig';

// test.describe('Confirm Hotel Suite', () => {
//   let confirmHotelPage;
//   let loginPage;
//   let searchHotelPage;
//   let selectHotelPage;
//   let bookHotelPage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     searchHotelPage = new SearchHotel(page);
//     selectHotelPage = new SelectHotel(page);
//     bookHotelPage = new BookHotel(page);
//     confirmHotelPage = new ConfirmHotel(page);

//     const sData = SearchData.ValidUser[0];
//     const bData = BookData.BookingData[0];
//     // 1. Login
//     await loginPage.gotoUrl(AppConfig.loginUrl);
//     await loginPage.login(AppConfig.username, AppConfig.password);

//     // 2. Search Hotel
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

//     // 3. Select Hotel
//     await selectHotelPage.selectHotel(sData.selectHotelRadioButton, sData.continueButton);

//     // 4. Book Hotel 
//     await bookHotelPage.bookingHotel(
//       bData.FirstName,
//       bData.LastName,
//       bData.BillingAddress,
//       bData.CreditCardNo,
//       bData.CreditCardType,
//       bData.ExpiryMonth,
//       bData.ExpiryYear,
//       bData.CVVNumber
//     );
//   });

//   test('Confirm Hotel and View Itinerary Test Case', async ({ page }) => {
//     await test.step('Verify Confirmation Page URL', async () => {
//         await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
//         await attachStepScreenshot(page, 'Confirm Hotel Page Loaded');
//     });

//     // Navigates directly to the Booked Itinerary page after booking confirmation
//     await test.step('Navigate to My Itinerary', async () => {
//         await confirmHotelPage.goToMyItinerary();
//     });
//   });
// });


import ConfirmHotel from '../Pages/ConfirmHotel';
import LoginPage from '../Pages/LoginPage';
import SearchHotel from '../Pages/SearchHotel';
import SelectHotel from '../Pages/SelectHotel';
import BookHotel from '../Pages/BookHotel';
import SearchData from '../testdata/SearchData.json';
import BookData from '../testdata/BookData.json';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig';

test.describe('Confirm Hotel Suite', () => {
  let confirmHotelPage;
  let loginPage;
  let searchHotelPage;
  let selectHotelPage;
  let bookHotelPage;
  let sData;
  let bData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    searchHotelPage = new SearchHotel(page);
    selectHotelPage = new SelectHotel(page);
    bookHotelPage = new BookHotel(page);
    confirmHotelPage = new ConfirmHotel(page);

    sData = SearchData.ValidUser[0];
    bData = BookData.BookingData[0];

    // 1. Login
    await loginPage.gotoUrl(AppConfig.loginUrl);
    await loginPage.login(AppConfig.username, AppConfig.password);

    // 2. Search Hotel
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

    // 3. Select Hotel
    await selectHotelPage.selectHotel();

    // 4. Book Hotel 
    await bookHotelPage.bookingHotel(
      bData.FirstName,
      bData.LastName,
      bData.BillingAddress,
      bData.CreditCardNo,
      bData.CreditCardType,
      bData.ExpiryMonth,
      bData.ExpiryYear,
      bData.CVVNumber
    );
  });

  // ==========================================
  // 1. POSITIVE TEST CASE (View Itinerary)
  // ==========================================
  test('Confirm Hotel and View Itinerary Test Case', async ({ page }) => {
    await test.step('Verify Confirmation Page URL', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
        await attachStepScreenshot(page, 'Confirm Hotel Page Loaded');
    });

    await test.step('Navigate to My Itinerary', async () => {
        await confirmHotelPage.goToMyItinerary();
        await expect(page).toHaveURL(/BookedItinerary\.php/);
        await attachStepScreenshot(page, 'Navigated to My Itinerary');
    });
  });

  // ==========================================
  // 2. ALTERNATIVE WORKFLOW TEST CASES
  // ==========================================
  test('Confirm Hotel and Return to Search Hotel', async ({ page }) => {
    await test.step('Verify Confirmation Page URL', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
        await attachStepScreenshot(page, 'Confirm Hotel Page Loaded');
    });

    await test.step('Click Search Hotel button from confirmation', async () => {
        await confirmHotelPage.searchHotelButton.click();
        await attachStepScreenshot(page, 'Clicked Search Hotel');
    });

    await test.step('Verify Return to Search Page', async () => {
        await expect(page).toHaveURL(/SearchHotel\.php/);
        await attachStepScreenshot(page, 'Returned to Search Hotel Page');
    });
  });

  test('Confirm Hotel and Logout Directly', async ({ page }) => {
    await test.step('Verify Confirmation Page URL', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
        await attachStepScreenshot(page, 'Confirm Hotel Page Loaded');
    });

    await test.step('Click Logout from confirmation page', async () => {
        await confirmHotelPage.logout();
        await attachStepScreenshot(page, 'Logged out from Confirmation');
    });

    await test.step('Verify Successful Logout to Logout Page', async () => {
        await expect(page).toHaveURL(/Logout\.php/);
        await attachStepScreenshot(page, 'Logout Successful');
    });
  });
});
