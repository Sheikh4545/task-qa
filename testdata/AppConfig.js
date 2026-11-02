
const username = process.env.TEST_USER_USERNAME || process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

if (!username) {
    throw new Error('Missing required environment variable: TEST_USER_USERNAME.');
}

if (!password) {
    throw new Error('Missing required environment variable: TEST_USER_PASSWORD.');
}

export const AppConfig = {
    logoutUrl: process.env.HOTEL_URL || "https://adactinhotelapp.com/Logout.php",
    baseUrl: "https://adactinhotelapp.com/index.php",
    loginUrl:"https://adactinhotelapp.com/",
    searchUrl:"https://adactinhotelapp.com/SearchHotel.php",
    selecturl:"https://adactinhotelapp.com/SelectHotel.php",
    bookurl:"https://adactinhotelapp.com/BookHotel.php",
    confirmurl:"https://adactinhotelapp.com/BookingConfirm.php",
    postmanApiUrl: process.env.BASE_URL || "https://api-testing-postman.vercel.app",
    itenaryurl:"https://adactinhotelapp.com/BookedItinerary.php",
    username,
    password,
};