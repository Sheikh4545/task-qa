

// import LoginPage from '../Pages/LoginPage';
// import { test, expect } from '../Fixture/TestSetup';
// import { attachStepScreenshot } from '../utilities/screenshot';
// import AssertionData from '../testdata/AssertionData.json';
// import { AppConfig } from '../testdata/AppConfig.js';

// test('Login Test Case with ValidUser', async ({ page }) => {
//     const loginPage = new LoginPage(page);

//     await test.step('Navigate and Login', async () => {
//         await loginPage.gotoUrl(AppConfig.loginUrl);
//         await loginPage.login(AppConfig.username, AppConfig.password);
//     });

//     await test.step('Verify Login Success', async () => {
//         await expect(page).toHaveURL(AssertionData.assertions[0].login_url);
//         await attachStepScreenshot(page, 'LoginPage Successful');
//     });
// });


import LoginPage from '../Pages/LoginPage';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig.js';

// ==========================================
// 1. POSITIVE TEST CASE
// ==========================================
test('Login Test Case with ValidUser', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate and Login', async () => {
        await loginPage.gotoUrl(AppConfig.loginUrl);
        await loginPage.login(AppConfig.username, AppConfig.password);
    });

    await test.step('Verify Login Success', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].login_url);
        await attachStepScreenshot(page, 'LoginPage Successful');
    });
});

// ==========================================
// 2. NEGATIVE TEST CASES
// ==========================================

test('Login Test Case with Invalid Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate and Login with Invalid Username', async () => {
        await loginPage.gotoUrl(AppConfig.loginUrl);
        // Passing an incorrect username with valid password
        await loginPage.login('InvalidUser123', AppConfig.password);
    });

    await test.step('Verify Login Failure & Error State', async () => {
        // Option A: Verify user remains on the login page (URL does not change to dashboard)
        await expect(page).not.toHaveURL(AssertionData.assertions[0].login_url);
        
        // Option B (Uncomment if your app shows an error message element, e.g., #error or .error):
        // const errorMessage = page.locator('#error'); // Adjust selector to your app's error banner
        // await expect(errorMessage).toBeVisible();

        await attachStepScreenshot(page, 'Login Failed - Invalid Username');
    });
});

test('Login Test Case with Invalid Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate and Login with Invalid Password', async () => {
        await loginPage.gotoUrl(AppConfig.loginUrl);
        // Passing valid username with an incorrect password
        await loginPage.login(AppConfig.username, 'WrongPassword123!');
    });

    await test.step('Verify Login Failure', async () => {
        await expect(page).not.toHaveURL(AssertionData.assertions[0].login_url);
        await attachStepScreenshot(page, 'Login Failed - Invalid Password');
    });
});

test('Login Test Case with Empty Fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate and Submit Empty Form', async () => {
        await loginPage.gotoUrl(AppConfig.loginUrl);
        // Passing empty strings
        await loginPage.login('', '');
    });

    await test.step('Verify Validation and Stay on Login Page', async () => {
        await expect(page).toHaveURL(AppConfig.loginUrl);
        await attachStepScreenshot(page, 'Login Failed - Empty Fields');
    });
});