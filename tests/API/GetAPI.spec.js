// import { test, expect } from '@playwright/test';
// import { attachStepScreenshot } from '../../utilities/screenshot';
// import { after } from 'node:test';
 
// test('Get All Users API Test', async ({ request }) => {
// const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
// console.log(await response.json());
// expect(response.status()).toBe(200);
// });

// test('Validate User API Response', async ({ request }) => {
// const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
// const responseBody = await response.json();
// expect(response.status()).toBe(200);
// expect(responseBody.data.length).toBeGreaterThan(0);
// });

// test('Validate User API', async ({ request }) => {
// const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
// const responseBody = await response.json();
// expect(response.status()).toBe(200);
// expect(responseBody.data.length).toBeGreaterThan(0);
// });

// test('Validate invalid End Point', async ({ request }) => {
// const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-user');
// console.log(await response.json());
// //await attachStepScreenshot(this.page,'001 responce');
// expect(response.status()).toBe(404);
// });

 
// test('Not Found (404)', async ({ request }) => {
// const response = await request.post('https://api-testing-postman.vercel.app/api/v1/users/all-users');
// console.log(await response.json());
// expect(response.status()).toBe(404);
// });


// import { test, expect } from '@playwright/test';
// import { attachApiLog } from '../../utilities/apiLogger';
// import { attachStepScreenshot } from '../../utilities/screenshot';

// test.only('Get All Users API Test', async ({ request, page }, testInfo) => {
//   const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
//   const responseBody = await response.json();
//   console.log(responseBody);
//   await attachStepScreenshot(testInfo, 'Invalid Endpoint - Response', { status: response.status(), body });
//   await attachApiLog('Get All Users Response', responseBody, page, testInfo);
  
//   expect(response.status()).toBe(200);
// });

// test('Validate User API Response', async ({ request, page }, testInfo) => {
//   const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
//   const responseBody = await response.json();
  
//   console.log(responseBody);
//   await attachApiLog('Validate User Response', responseBody, page, testInfo);
  
//   expect(response.status()).toBe(200);
//   expect(responseBody.data.length).toBeGreaterThan(0);
// });

// test('Validate User API', async ({ request, page }, testInfo) => {
//   const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
//   const responseBody = await response.json();
  
//   console.log(responseBody);
//   await attachApiLog('Validate User API Response', responseBody, page, testInfo);
  
//   expect(response.status()).toBe(200);
//   expect(responseBody.data.length).toBeGreaterThan(0);
// });

// test('Validate invalid End Point', async ({ request, page }, testInfo) => {
//   const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-user');
//   const responseBody = await response.json();
  
//   console.log(responseBody);
//   await attachApiLog('Invalid Endpoint Response', responseBody, page, testInfo);
  
//   expect(response.status()).toBe(404);
// });

// test('Not Found (404)', async ({ request, page }, testInfo) => {
//   const response = await request.post('https://api-testing-postman.vercel.app/api/v1/users/all-users');
//   const responseBody = await response.json();
  
//   console.log(responseBody);
//   await attachApiLog('Post 404 Response', responseBody, page, testInfo);
  
//   expect(response.status()).toBe(404);
// });







//new test data
import { test, expect } from '@playwright/test';
import { attachApiLog } from '../../utilities/apiLogger';

test('Get All Users API Test', async ({ request, page }, testInfo) => {
  const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
  const responseBody = await response.json();
  
  console.log(responseBody);

  await attachApiLog('Get All Users Response', responseBody, page, testInfo);
  
  expect(response.status()).toBe(200);
});

test('Validate User API Response', async ({ request, page }, testInfo) => {
  const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
  const responseBody = await response.json();
  
  console.log(responseBody);
  await attachApiLog('Validate User Response', responseBody, page, testInfo);
  
  expect(response.status()).toBe(200);
  expect(responseBody.data.length).toBeGreaterThan(0);
});

test('Validate User API', async ({ request, page }, testInfo) => {
  const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-users');
  const responseBody = await response.json();
  
  console.log(responseBody);
  await attachApiLog('Validate User API Response', responseBody, page, testInfo);
  
  expect(response.status()).toBe(200);
  expect(responseBody.data.length).toBeGreaterThan(0);
});

test('Validate invalid End Point', async ({ request, page }, testInfo) => {
  const response = await request.get('https://api-testing-postman.vercel.app/api/v1/users/all-user');
  const responseBody = await response.json();
  
  console.log(responseBody);
  await attachApiLog('Invalid Endpoint Response', responseBody, page, testInfo);
  
  expect(response.status()).toBe(404);
});

test('Not Found (404)', async ({ request, page }, testInfo) => {
  const response = await request.post('https://api-testing-postman.vercel.app/api/v1/users/all-users');
  const responseBody = await response.json();
  
  console.log(responseBody);
  await attachApiLog('Post 404 Response', responseBody, page, testInfo);
  
  expect(response.status()).toBe(404);
});