import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { attachApiLog } from '../../utilities/apiLogger.js';

const baseURL = process.env.BASE_URL;

test('Update authenticated user account with PATCH', async ({ request }) => {
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

    let authenticated = false;

    try {
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
        authenticated = true;

        const updatedUser = {
            fullname: `Updated ${id}`,
            email: user.email,
            username: user.username,
        };
        const patchResponse = await request.patch(
            `${baseURL}/api/v1/users/update-account`,
            { data: updatedUser },
        );
        const patchBody = await patchResponse.json();
        await attachApiLog('PATCH API Response', {
            status: patchResponse.status(),
            body: patchBody,
        });

        expect(patchResponse.status()).toBe(200);
        expect(patchBody.success).toBe(true);
    } finally {
        if (authenticated) {
            const deleteResponse = await request.delete(
                `${baseURL}/api/v1/users/delete-account`,
            );
            const deleteBody = await deleteResponse.json();
            await attachApiLog('Delete Test User Response', {
                status: deleteResponse.status(),
                body: deleteBody,
            });
            expect(deleteResponse.status()).toBe(200);
        }
    }
});
