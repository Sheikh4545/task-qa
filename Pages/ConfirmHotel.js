

// import { attachStepScreenshot } from '../utilities/screenshot.js';
// import { test } from '../Fixture/TestSetup.js';

// class ConfirmHotel {
//     constructor(page) {
//         this.page = page;
//         this.searchHotelButton = page.locator('#search_hotel');
//         this.myItineraryButton = page.locator('#my_itinerary');
//         this.logoutButton = page.locator('#logout');
//     }

//     async goToMyItinerary() {
//         await test.step('Click my itinerary button', async () => {
//             await this.myItineraryButton.click();
//             await attachStepScreenshot(this.page, '02 - After my itinerary click');
//         });
//     }

//     async logout() {
//         await test.step('Click logout button', async () => {
//             await this.logoutButton.click();
//             await attachStepScreenshot(this.page, '03 - After logout click');
//         });
//     }
// }

// export default ConfirmHotel;


import { attachStepScreenshot } from '../utilities/screenshot.js';
import { test } from '../Fixture/TestSetup.js';

class ConfirmHotel {
    constructor(page) {
        this.page = page;
        this.searchHotelButton = page.locator('#search_hotel');
        this.myItineraryButton = page.locator('#my_itinerary');
        this.logoutButton = page.locator('#logout');
    }

    async goToMyItinerary() {
        await test.step('Click my itinerary button', async () => {
            // Ensure the button is visible and stable before clicking in CI
            await this.myItineraryButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.myItineraryButton.click({ force: true });
            await attachStepScreenshot(this.page, '02 - After my itinerary click');
        });
    }

    async logout() {
        await test.step('Click logout button', async () => {
            // Ensure the button is visible and stable before clicking in CI
            await this.logoutButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.logoutButton.click({ force: true });
            await attachStepScreenshot(this.page, '03 - After logout click');
        });
    }
}

export default ConfirmHotel;