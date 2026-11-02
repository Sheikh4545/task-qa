
// import { test, expect } from '../Fixture/TestSetup.js';
// import LoginData from '../testdata/LoginData.json';
// import SearchData from '../testdata/SearchData.json';
// import BookData from '../testdata/BookData.json';
// import AssertionData from '../testdata/AssertionData.json';
// import LoginPage from '../Pages/LoginPage';
// import SearchHotel from '../Pages/SearchHotel';
// import SelectHotel from '../Pages/SelectHotel';
// import BookHotel from '../Pages/BookHotel';
// import ConfirmHotel from '../Pages/ConfirmHotel';
// import Itinerary from '../Pages/Iteniary.js'; // Fixed typo here!
// import Logout from '../Pages/Logout.js';
// import { AppConfig } from '../testdata/AppConfig.js';
// import { attachStepScreenshot } from '../utilities/screenshot.js';

// test.use({ storageState: 'auth.json' });

// test('End-to-End Hotel Booking Test Case', async ({ page }) => {
//     const searchHotelPage = new SearchHotel(page);
//     const selectHotelPage = new SelectHotel(page);
//     const bookHotel = new BookHotel(page);
//     const confirmHotel = new ConfirmHotel(page);
//     const itineraryPage = new Itinerary(page);
//     const logout = new Logout(page);
    
//     const sData = SearchData.ValidUser[0];
//     const selectData = SearchData.ValidUser[0];
//     const bookData = BookData.BookingData[0];

//     // 1. Go to Search Page
//     await searchHotelPage.gotosearch();
//     await attachStepScreenshot(page, 'Search Hotel Page Loaded');

//     await expect(page).toHaveURL(AssertionData.assertions[0].search_hotel_url);
//     await attachStepScreenshot(page, 'Search Hotel Page URL Verified');

//     // 2. Perform Search
//     await searchHotelPage.searchHotel(
//         sData.searchLocation,
//         sData.searchHotel,
//         sData.searchRoomType,
//         sData.searchNumberOfRooms,
//         sData.searchCheckInDate,
//         sData.searchCheckOutDate,
//         sData.searchAdultsPerRoom,
//         sData.searchChildrenPerRoom
//     );
//     await attachStepScreenshot(page, 'Hotel Search Completed');

//     // 3. Select Hotel
//     await expect(page).toHaveURL(AssertionData.assertions[0].select_hotel_url);
//     await attachStepScreenshot(page, 'Select Hotel Page Loaded');

//     await selectHotelPage.selectHotel(
//         selectData.selectHotelRadioButton,
//         selectData.continueButton
//     );
//     await attachStepScreenshot(page, 'Hotel Selection Completed');

//     // 4. Book Hotel
//     await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
//     await attachStepScreenshot(page, 'Book Hotel Page Loaded');
    
//     await bookHotel.bookingHotel( 
//         bookData.FirstName, 
//         bookData.LastName, 
//         bookData.BillingAddress,  
//         bookData.CreditCardNo,
//         bookData.CreditCardType,
//         bookData.ExpiryMonth,
//         bookData.ExpiryYear,
//         bookData.CVVNumber
//     );
//     await attachStepScreenshot(page, 'Hotel Booking Form Submitted');

//     // 5. Confirm and view Itinerary
//     await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
//     await attachStepScreenshot(page, 'Hotel Booking Confirmation Page Loaded');
    
//     await confirmHotel.goToMyItinerary();

//     await expect(page).toHaveURL(AssertionData.assertions[0].my_itinerary_url);
//     await attachStepScreenshot(page, 'My Itinerary Page Loaded');

//     await itineraryPage.verifyItinerary();
//     await attachStepScreenshot(page, 'Verify Itinerary Action Complete');
    
//     // 6. Logout and verify
//     await logout.performLogout();
//     await expect(page).toHaveURL(AssertionData.assertions[0].logout_url);
//     await attachStepScreenshot(page, 'Logout Successful after Booking');
// });

import { test, expect } from '../Fixture/TestSetup.js';
import SearchData from '../testdata/SearchData.json';
import BookData from '../testdata/BookData.json';
import AssertionData from '../testdata/AssertionData.json';
import SearchHotel from '../Pages/SearchHotel';
import SelectHotel from '../Pages/SelectHotel';
import BookHotel from '../Pages/BookHotel';
import ConfirmHotel from '../Pages/ConfirmHotel';
import Itinerary from '../Pages/Iteniary.js';
import Logout from '../Pages/Logout.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.use({ storageState: 'auth.json' });

test('End-to-End Hotel Booking Test Case', async ({ page }) => {
    const searchHotelPage = new SearchHotel(page);
    const selectHotelPage = new SelectHotel(page);
    const bookHotel = new BookHotel(page);
    const confirmHotel = new ConfirmHotel(page);
    const itineraryPage = new Itinerary(page);
    const logout = new Logout(page);
    
    const sData = SearchData.ValidUser[0];
    const bookData = BookData.BookingData[0];

    // 1. Go to Search Page
    await searchHotelPage.gotosearch();
    await attachStepScreenshot(page, 'Search Hotel Page Loaded');

    await expect(page).toHaveURL(AssertionData.assertions[0].search_hotel_url);
    await attachStepScreenshot(page, 'Search Hotel Page URL Verified');

    // 2. Perform Search
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
    await attachStepScreenshot(page, 'Hotel Search Completed');

    // 3. Select Hotel
    await expect(page).toHaveURL(AssertionData.assertions[0].select_hotel_url);
    await attachStepScreenshot(page, 'Select Hotel Page Loaded');

    await selectHotelPage.selectHotel();
    await attachStepScreenshot(page, 'Hotel Selection Completed');

    // 4. Book Hotel
    await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
    await attachStepScreenshot(page, 'Book Hotel Page Loaded');
    
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
    await attachStepScreenshot(page, 'Hotel Booking Form Submitted');

    // 5. Confirm and view Itinerary
    // Adactin loads BookingConfirm.php here, which shares the book_hotel_url assertion or can check the confirm pattern
    await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
    await attachStepScreenshot(page, 'Hotel Booking Confirmation Page Loaded');
    
    await confirmHotel.goToMyItinerary();

    await expect(page).toHaveURL(AssertionData.assertions[0].my_itinerary_url);
    await attachStepScreenshot(page, 'My Itinerary Page Loaded');

    await itineraryPage.verifyItinerary();
    await attachStepScreenshot(page, 'Verify Itinerary Action Complete');
    
    // 6. Logout and verify
    await logout.performLogout();
    await expect(page).toHaveURL(AssertionData.assertions[0].logout_url);
    await attachStepScreenshot(page, 'Logout Successful after Booking');
});