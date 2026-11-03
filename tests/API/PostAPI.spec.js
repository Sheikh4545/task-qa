import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { attachApiLog } from '../../utilities/apiLogger.js';

const baseURL = process.env.BASE_URL;

test.describe('Post API Test Suite', () => {
    test('POST to login endpoint returns 404 when unsupported', async ({ request }) => {
        expect(baseURL, 'Set BASE_URL in .env before running API tests').toBeTruthy();

        const id = randomUUID();
        const response = await request.post(`${baseURL}/api/v1/users/login`, {
            data: {
                fullname: `Playwright ${id}`,
                email: `${id}@example.com`,
                username: `pw-${id}`,
                password: `Pw-${id}-test`,
            },
        });
        const responseBody = await response.text();

        await attachApiLog('POST Login Response', {
            status: response.status(),
            body: responseBody,
        });
        expect(response.status()).toBe(404);
    });

    test('POST to all-users endpoint returns 404', async ({ request }) => {
        expect(baseURL, 'Set BASE_URL in .env before running API tests').toBeTruthy();

        const response = await request.post(`${baseURL}/api/v1/users/all-users`);
        const responseBody = await response.text();

        await attachApiLog('POST All Users Response', {
            status: response.status(),
            body: responseBody,
        });
        expect(response.status()).toBe(404);
    });
});
