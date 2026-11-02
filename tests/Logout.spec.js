
// import { attachStepScreenshot } from '../utilities/screenshot.js';
// import AssertionData from '../testdata/AssertionData.json';
// import { test, expect } from '../Fixture/TestSetup.js';
// import { AppConfig } from '../testdata/AppConfig.js';
// import Logout from '../Pages/Logout.js';
// import LoginPage from '../Pages/LoginPage.js';

// // import BookHotelPage from '../Pages/BookHotelPage.js'; // Imagine have a hotel booking page object

// test('Book Hotel and Logout Test Case', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const logout = new Logout(page);

  
//     await test.step('Login to Application', async () => {
//         await loginPage.gotoUrl(AppConfig.loginUrl);
//         await loginPage.login(AppConfig.username, AppConfig.password);
//     });

    
//     await test.step('Book a Hotel', async () => {
//     });

   
//     await test.step('Perform Logout', async () => {
//         await logout.performLogout();
//     });

   
//     await test.step('Verify Logout Success', async () => {
//         await expect(page).toHaveURL(AssertionData.assertions[0].logout_url);
//         await attachStepScreenshot(page, 'Logout Successful after Booking');
//     });
// });
import { attachStepScreenshot } from '../utilities/screenshot.js';
import AssertionData from '../testdata/AssertionData.json';
import { test, expect } from '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';
import Logout from '../Pages/Logout.js';
import LoginPage from '../Pages/LoginPage.js';

test.describe('Logout Suite', () => {

    test('Login and Perform Logout Test Case', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const logout = new Logout(page);

        await test.step('Login to Application', async () => {
            await loginPage.gotoUrl(AppConfig.loginUrl);
            await loginPage.login(AppConfig.username, AppConfig.password);
            await attachStepScreenshot(page, 'Logged in Successfully');
        });

        await test.step('Perform Logout', async () => {
            await logout.performLogout();
        });

        await test.step('Verify Logout Success', async () => {
            // Adactin redirects to Logout.php on successful logout
            await expect(page).toHaveURL(AssertionData.assertions[0].logout_url);
            await attachStepScreenshot(page, 'Logout Successful Page Loaded');
        });
    });

    test('Logout and Click Login Again Test Case', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const logout = new Logout(page);

        await test.step('Login to Application', async () => {
            await loginPage.gotoUrl(AppConfig.loginUrl);
            await loginPage.login(AppConfig.username, AppConfig.password);
        });

        await test.step('Perform Logout', async () => {
            await logout.performLogout();
        });

        await test.step('Verify Logout and Click Login Again', async () => {
            await expect(page).toHaveURL(AssertionData.assertions[0].logout_url);
            
            // Use the method from Logout.js to click 'Click here to login again'
            await logout.clickLoginAgain();
            
            // Verify we returned to the login/index page
            await expect(page).toHaveURL(/index\.php/);
            await attachStepScreenshot(page, 'Returned to Login Page Successfully');
        });
    });
});