
// import BookHotel from '../Pages/BookHotel';
// import BookData from '../testdata/BookData.json';
// import Logout from '../Pages/Logout';
// import { test, expect } from '../Fixture/TestSetup';
// import { attachStepScreenshot } from '../utilities/screenshot';
// import AssertionData from '../testdata/AssertionData.json';
// import { AppConfig } from '../testdata/AppConfig';
// test.describe('Book Hotel Suite', () => {
//   let bookHotel;
//   let logout;
//   let bookData;

 
//   test.beforeEach(async ({ page }) => {
//     bookHotel = new BookHotel(page);
//     logout = new Logout(page);
//     await page.goto(AppConfig.bookurl);
//     bookData = BookData.BookingData[0];
//   });

//   test.afterEach(async () => {
//     await logout.performLogout();
//   });

//   test('Book Hotel Test Case', async ({ page }) => {
//     await test.step('Fill Booking Details and Submit', async () => {
//       await bookHotel.bookingHotel( 
//         bookData.FirstName, 
//         bookData.LastName, 
//         bookData.BillingAddress,  
//         bookData.CreditCardNo,
//         bookData.CreditCardType,
//         bookData.ExpiryMonth,
//         bookData.ExpiryYear,
//         bookData.CVVNumber
//       );
//     });

//     await test.step('Verify Booking Success', async () => {
//       await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
//       await attachStepScreenshot(page, 'Book Hotel Successful');
//     });
//   });
// });


//new code after error
// import BookHotel from '../Pages/BookHotel';
// import SearchHotel from '../Pages/SearchHotel';
// import SelectHotel from '../Pages/SelectHotel';
// import BookData from '../testdata/BookData.json';
// import SearchData from '../testdata/SearchData.json';
// import Logout from '../Pages/Logout';
// import { test, expect } from '../Fixture/TestSetup';
// import { attachStepScreenshot } from '../utilities/screenshot';
// import AssertionData from '../testdata/AssertionData.json';
// import { AppConfig } from '../testdata/AppConfig';

// test.describe('Book Hotel Suite', () => {
//   let searchHotelPage;
//   let selectHotelPage;
//   let bookHotel;
//   let sData;
//   let bookData;

//   // Helper function to navigate cleanly up to the Book Hotel page
//   async function navigateToBookPage(page) {
//     searchHotelPage = new SearchHotel(page);
//     selectHotelPage = new SelectHotel(page);
//     bookHotel = new BookHotel(page);
    
//     sData = SearchData.ValidUser[0];

//     // 0. Ensure we start fresh on the Search Hotel page using our auth session
//     await page.goto(AppConfig.searchUrl);
//     await expect(page).toHaveURL(AssertionData.assertions[0].search_hotel_url);

//     // 1. Perform Search
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

//     // 2. Select Hotel to reach Book Page
//     await selectHotelPage.selectHotel();
//     await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
//   }

//   test.beforeEach(async ({ page }) => {
//     bookData = BookData.BookingData[0];
//   });

//   // ==========================================
//   // 1. POSITIVE TEST CASE
//   // ==========================================
//   test('Book Hotel Test Case with Valid Data', async ({ page }) => {
//     await navigateToBookPage(page);
    
//     await test.step('Fill Booking Details and Submit', async () => {
//       await bookHotel.bookingHotel( 
//         bookData.FirstName, 
//         bookData.LastName, 
//         bookData.BillingAddress,  
//         bookData.CreditCardNo,
//         bookData.CreditCardType,
//         bookData.ExpiryMonth,
//         bookData.ExpiryYear,
//         bookData.CVVNumber
//       );
//     });

//     await test.step('Verify Booking Success', async () => {
//       await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
//       await attachStepScreenshot(page, 'Book Hotel Successful');
//     });
//   });

//   // ==========================================
//   // 2. NEGATIVE TEST CASES
//   // ==========================================

//   test('Book Hotel Test Case with Invalid Credit Card Number', async ({ page }) => {
//     await navigateToBookPage(page);

//     await test.step('Fill Booking Details with Short/Invalid CC Number', async () => {
//       await bookHotel.bookingHotel( 
//         bookData.FirstName, 
//         bookData.LastName, 
//         bookData.BillingAddress,  
//         '12345', // Invalid short credit card number
//         bookData.CreditCardType,
//         bookData.ExpiryMonth,
//         bookData.ExpiryYear,
//         bookData.CVVNumber
//       );
//     });

//     await test.step('Verify Booking Blocked & Error Label Shown', async () => {
//       expect(page.url()).not.toContain('BookingConfirm.php');
//       await expect(page.locator('#first_name')).toBeVisible();
//       await attachStepScreenshot(page, 'Booking Failed - Invalid CC Number');
//     });
//   });

//   test('Book Hotel Test Case with Missing Mandatory First Name', async ({ page }) => {
//     await navigateToBookPage(page);

//     await test.step('Fill Booking Details with Empty First Name', async () => {
//       await bookHotel.bookingHotel( 
//         '', // Empty First Name
//         bookData.LastName, 
//         bookData.BillingAddress,  
//         bookData.CreditCardNo,
//         bookData.CreditCardType,
//         bookData.ExpiryMonth,
//         bookData.ExpiryYear,
//         bookData.CVVNumber
//       );
//     });

//     await test.step('Verify Validation Error & Stays on Booking Form', async () => {
//       expect(page.url()).not.toContain('BookingConfirm.php');
//       await expect(page.locator('#first_name')).toBeVisible();
//       await attachStepScreenshot(page, 'Booking Failed - Missing First Name');
//     });
//   });

//   test('Book Hotel Test Case with Invalid CVV', async ({ page }) => {
//     await navigateToBookPage(page);

//     await test.step('Fill Booking Details with Invalid CVV', async () => {
//       await bookHotel.bookingHotel( 
//         bookData.FirstName, 
//         bookData.LastName, 
//         bookData.BillingAddress,  
//         bookData.CreditCardNo,
//         bookData.CreditCardType,
//         bookData.ExpiryMonth,
//         bookData.ExpiryYear,
//         '1' // Invalid 1-digit CVV
//       );
//     });

//     await test.step('Verify Booking Failure for Invalid CVV', async () => {
//       expect(page.url()).not.toContain('BookingConfirm.php');
//       await expect(page.locator('#first_name')).toBeVisible();
//       await attachStepScreenshot(page, 'Booking Failed - Invalid CVV');
//     });
//   });
// });

import BookHotel from '../Pages/BookHotel';
import SearchHotel from '../Pages/SearchHotel';
import SelectHotel from '../Pages/SelectHotel';
import LoginPage from '../Pages/LoginPage';
import BookData from '../testdata/BookData.json';
import SearchData from '../testdata/SearchData.json';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig';

test.describe('Book Hotel Suite', () => {
  let searchHotelPage;
  let selectHotelPage;
  let bookHotel;
  let loginPage;
  let sData;
  let bookData;

  // Helper function to navigate cleanly up to the Book Hotel page with session recovery
  async function navigateToBookPage(page) {
    searchHotelPage = new SearchHotel(page);
    selectHotelPage = new SelectHotel(page);
    bookHotel = new BookHotel(page);
    loginPage = new LoginPage(page);
    
    sData = SearchData.ValidUser[0];

    // 0. Navigate to search URL
    await page.goto(AppConfig.searchUrl);

    // Fallback: If storageState didn't carry over in CI, log in programmatically
    if (page.url().includes('index.php')) {
      await loginPage.login(process.env.TEST_USER_USERNAME, process.env.TEST_USER_PASSWORD);
      await page.goto(AppConfig.searchUrl);
    }

    await expect(page).toHaveURL(AssertionData.assertions[0].search_hotel_url);

    // 1. Perform Search
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

    // 2. Select Hotel to reach Book Page
    await selectHotelPage.selectHotel();
    await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
  }

  test.beforeEach(async ({ page }) => {
    bookData = BookData.BookingData[0];
  });

  // ==========================================
  // 1. POSITIVE TEST CASE
  // ==========================================
  test('Book Hotel Test Case with Valid Data', async ({ page }) => {
    await navigateToBookPage(page);
    
    await test.step('Fill Booking Details and Submit', async () => {
      await bookHotel.bookingHotel( 
        bookData.FirstName, 
        bookData.LastName, 
        bookData.BillingAddress,  
        bookData.CreditCardNo,
        bookData.CreditCardType,
        bookData.ExpiryMonth,
        bookData.ExpiryYear,
        bookData.CVVNumber
      );
    });

    await test.step('Verify Booking Success', async () => {
      await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
      await attachStepScreenshot(page, 'Book Hotel Successful');
    });
  });

  // ==========================================
  // 2. NEGATIVE TEST CASES
  // ==========================================

  test('Book Hotel Test Case with Invalid Credit Card Number', async ({ page }) => {
    await navigateToBookPage(page);

    await test.step('Fill Booking Details with Short/Invalid CC Number', async () => {
      await bookHotel.bookingHotel( 
        bookData.FirstName, 
        bookData.LastName, 
        bookData.BillingAddress,  
        '12345', // Invalid short credit card number
        bookData.CreditCardType,
        bookData.ExpiryMonth,
        bookData.ExpiryYear,
        bookData.CVVNumber
      );
    });

    await test.step('Verify Booking Blocked & Error Label Shown', async () => {
      expect(page.url()).not.toContain('BookingConfirm.php');
      await expect(page.locator('#first_name')).toBeVisible();
      await attachStepScreenshot(page, 'Booking Failed - Invalid CC Number');
    });
  });

  test('Book Hotel Test Case with Missing Mandatory First Name', async ({ page }) => {
    await navigateToBookPage(page);

    await test.step('Fill Booking Details with Empty First Name', async () => {
      await bookHotel.bookingHotel( 
        '', // Empty First Name
        bookData.LastName, 
        bookData.BillingAddress,  
        bookData.CreditCardNo,
        bookData.CreditCardType,
        bookData.ExpiryMonth,
        bookData.ExpiryYear,
        bookData.CVVNumber
      );
    });

    await test.step('Verify Validation Error & Stays on Booking Form', async () => {
      expect(page.url()).not.toContain('BookingConfirm.php');
      await expect(page.locator('#first_name')).toBeVisible();
      await attachStepScreenshot(page, 'Booking Failed - Missing First Name');
    });
  });

  test('Book Hotel Test Case with Invalid CVV', async ({ page }) => {
    await navigateToBookPage(page);

    await test.step('Fill Booking Details with Invalid CVV', async () => {
      await bookHotel.bookingHotel( 
        bookData.FirstName, 
        bookData.LastName, 
        bookData.BillingAddress,  
        bookData.CreditCardNo,
        bookData.CreditCardType,
        bookData.ExpiryMonth,
        bookData.ExpiryYear,
        '1' // Invalid 1-digit CVV
      );
    });

    await test.step('Verify Booking Failure for Invalid CVV', async () => {
      expect(page.url()).not.toContain('BookingConfirm.php');
      await expect(page.locator('#first_name')).toBeVisible();
      await attachStepScreenshot(page, 'Booking Failed - Invalid CVV');
    });
  });
});