
import { attachStepScreenshot } from '../utilities/screenshot.js';
import { test } from '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';

class Itinerary {
    constructor(page) {
        this.page = page;
        // Locator for the Booked Itinerary menu link in the header
        this.bookedItineraryLink = page.getByRole('link', { name: 'Booked Itinerary' });
        this.searchHotelButton = page.getByRole('link', { name: 'Search Hotel' });
    }

    async gotoItinerary() {
        await test.step('Click Booked Itinerary menu link', async () => {
            await this.bookedItineraryLink.click();
            await attachStepScreenshot(this.page, '01 - After click on itenrary ');
            await this.page.waitForLoadState('load').catch(() => {});
        });
    }

    async verifyItinerary() {
        await test.step('Perform itinerary search/action', async () => {
            await this.searchHotelButton.click({ noWaitAfter: true });
            await this.page.waitForURL(AppConfig.searchUrl);
            await attachStepScreenshot(this.page, '01 - After itinerary action');
        });
    }
}

export default Itinerary;