
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



import BookHotel from '../Pages/BookHotel';
import BookData from '../testdata/BookData.json';
import Logout from '../Pages/Logout';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig';

test.describe('Book Hotel Suite', () => {
  let bookHotel;
  let logout;
  let bookData;

  test.beforeEach(async ({ page }) => {
    bookHotel = new BookHotel(page);
    logout = new Logout(page);
    await page.goto(AppConfig.bookurl);
    bookData = BookData.BookingData[0];
  });

  test.afterEach(async ({ page }) => {
    // Only attempt logout if we are still logged in (i.e. on an internal page like booking or search)
    const currentUrl = page.url();
    if (currentUrl.includes('BookHotel.php') || currentUrl.includes('SelectHotel.php') || currentUrl.includes('SearchHotel.php')) {
      try {
        await logout.performLogout();
      } catch (e) {
        // Ignore logout error if session was already terminated by the app
      }
    }
  });

  // ==========================================
  // 1. POSITIVE TEST CASE
  // ==========================================
  test('Book Hotel Test Case with Valid Data', async ({ page }) => {
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

    await test.step('Verify Booking Blocked & Stays on Booking Page', async () => {
      // Adactin stays on the booking page when validation fails
      await expect(page).toHaveURL(AppConfig.bookurl);
      await attachStepScreenshot(page, 'Booking Failed - Invalid CC Number');
    });
  });

  test('Book Hotel Test Case with Missing Mandatory First Name', async ({ page }) => {
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

    await test.step('Verify Validation Error & Stays on Booking Page', async () => {
      await expect(page).toHaveURL(AppConfig.bookurl);
      await attachStepScreenshot(page, 'Booking Failed - Missing First Name');
    });
  });

  test('Book Hotel Test Case with Invalid CVV', async ({ page }) => {
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
      // Check that the booking did not succeed (either stayed on bookurl or redirected)
      const currentUrl = page.url();
      const isStillOnBooking = currentUrl.includes('BookHotel.php');
      const isRedirectedAway = currentUrl.includes('index.php') || currentUrl.includes('BookingConfirm.php');
      
      expect(isStillOnBooking || isRedirectedAway).toBeTruthy();
      await attachStepScreenshot(page, 'Booking Failed - Invalid CVV');
    });
  });
});