import { chromium, Browser } from 'playwright';
import { test, expect } from '@playwright/test';

import Header from '../pages/header';
import LoginPage from '../pages/login-page';
import SignUpPage from '../pages/signup-page';
import MainPage from '../pages/main-page';
import CookiePopup from '../pages/cookie-popup';
import AccountMessagePage from '../pages/account-message-page';
import { AccountMessages, LoginPageMsg, SignUpPageMsg } from '../../../constants/test-strings';
import { urls } from '../../../constants/urls';
import { deleteUserAndVerify } from '../../../utils/account-utils';

import { generateUserData, loadUserData, generateSingleUser } from '../../../utils/generateTestData';
import { UserData } from '../../../interfaces/user';

let header: Header;
let loginPage: LoginPage;
let signUpPage: SignUpPage;
let mainPage: MainPage;
let cookiePopup: CookiePopup;
let accountMessage: AccountMessagePage;

let testUser: UserData;

//let browser: Browser;

test.describe('Login user', () => {

    test.beforeAll(async () => {
        //browser = await chromium.launch();

    });

    test.beforeEach(async ({ context, page }) => {  
        loginPage = new LoginPage(page);
        signUpPage = new SignUpPage(page);
        cookiePopup = new CookiePopup(page);
        accountMessage = new AccountMessagePage(page); 
        mainPage = new MainPage(page);
        header = new Header(page);
        await page.goto(urls.base);
        await cookiePopup.acceptCookieIfVisible();
    });

    test(`sign up new user and login with correct email and password`, async ( {page} ) => {
        testUser = generateSingleUser();
        const userWithCustomEmail = {
            ...generateSingleUser(),
            email: 'test@example.com', 
            company: '',
        };

        await header.clickLogin();
        //await console.log(userWithCustomEmail);
        await console.log(testUser);

        await loginPage.fillAndSubmitSignUpForm(testUser.customerfullname, testUser.email);
        await signUpPage.fillAndSubmitSignUpForm1(testUser);
        await page.waitForTimeout(10000);

        //await loginPage.fillAndSubmitSignUpForm(userWithCustomEmail.customerfullname, userWithCustomEmail.email);
/*
        await signUpPage.fillAndSubmitSignUpForm('Mr', newUser.password, newUser.birthDay, 
                                        newUser.birthMonth, newUser.birthYear, 
                                        newUser.firstName, newUser.lastName, 
                                        newUser.company, newUser.address, 
                                        newUser.address2, newUser.state, 
                                        newUser.city, newUser.zipcode, newUser.mobileNumber,
                                        true, true);

        await accountMessage.clickContinueButton();

        await header.clickLogout();
        expect(await page.url()).toBe(`https://automationexercise.com/login`);

        await loginPage.fillLoginEmail(newUser.email);
        await loginPage.fillLoginPassword(newUser.password);
        await loginPage.clickLoginButton();

        expect(await header.isDeleteUserLinkVisible()).toBeTruthy();
        expect(await header.getName()).toBe(newUser.customerfullname);

        expect(page.url()).toBe(urls.base);
        expect(await mainPage.isSliderVisible()).toBeTruthy();    */ 
    });
    
        
    test.afterAll(async () => {
      //await browser.close();
    });

})
