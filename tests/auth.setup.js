
import {test as setup ,expect} from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import { AppConfig } from '../testdata/AppConfig.js';



setup ('setup',async ({page})=>
{
    const Login = new LoginPage(page )
    await Login.gotoUrl();
    await Login.login(AppConfig.username, AppConfig.password);
    await expect(page).toHaveURL('https://adactinhotelapp.com/SearchHotel.php');
    await page.context().storageState({path:'auth.json'});

});
