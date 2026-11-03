import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { attachApiLog } from '../../utilities/apiLogger.js';

const baseURL = process.env.BASE_URL;

test('Delete authenticated user account', async ({ request }) => {
    expect(baseURL, 'Set BASE_URL in .env before running API tests').toBeTruthy();

    const id = randomUUID();
    const user = {
        fullname: `Playwright ${id}`,
        email: `${id}@example.com`,
        username: `pw-${id}`,
        password: `Pw-${id}-test`,
    };

    const registerResponse = await request.post(
        `${baseURL}/api/v1/users/register`,
        { data: user },
    );
    const registerBody = await registerResponse.json();
    await attachApiLog('Register Test User Response', {
        status: registerResponse.status(),
        body: registerBody,
    });
    expect(registerResponse.status()).toBe(201);

    const loginResponse = await request.post(
        `${baseURL}/api/v1/users/login`,
        { data: { username: user.username, password: user.password } },
    );
    const loginBody = await loginResponse.json();
    await attachApiLog('Login Test User Response', {
        status: loginResponse.status(),
        body: loginBody,
    });
    expect(loginResponse.status()).toBe(200);

    const deleteResponse = await request.delete(
        `${baseURL}/api/v1/users/delete-account`,
    );
    const deleteBody = await deleteResponse.json();
    await attachApiLog('Delete Test User Response', {
        status: deleteResponse.status(),
        body: deleteBody,
    });
    expect(deleteResponse.status()).toBe(200);
    expect(deleteBody.success).toBe(true);
});

test('Delete without authentication returns 401', async ({ request }) => {
    expect(baseURL, 'Set BASE_URL in .env before running API tests').toBeTruthy();

    const response = await request.delete(
        `${baseURL}/api/v1/users/delete-account`,
    );
    const responseBody = await response.json();

    await attachApiLog('Unauthenticated Delete Response', {
        status: response.status(),
        body: responseBody,
    });
    expect(response.status()).toBe(401);
});
