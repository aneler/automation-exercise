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

let newUser: UserData;

//let browser: Browser;

test.describe('New user registration', () => {

    test.beforeAll(async () => {
        await generateUserData(1);
        const userData = await loadUserData();
        newUser = userData.users[0];

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

    test(`register new user, verify account creation and delete account`, async ( {page} ) => {
        expect(await mainPage.isSliderVisible()).toBeTruthy();

        await header.clickLogin();
        expect(await loginPage.getSignUpFormHeader()).toBe(LoginPageMsg.SIGNUP_FORM_HEADER);
        
        await loginPage.fillAndSubmitLoginForm(newUser.customerfullname, newUser.email);
        
        expect(await signUpPage.getFormHeader()).toBe(SignUpPageMsg.ACCOUNT_INFORMATION_HEADER);

        await signUpPage.fillAndSubmitSignUpForm('Mrs', newUser.password, newUser.birthDay, 
                                        newUser.birthMonth, newUser.birthYear, 
                                        newUser.firstName, newUser.lastName, 
                                        newUser.company, newUser.address, 
                                        newUser.address2, newUser.state, 
                                        newUser.city, newUser.zipcode, newUser.mobileNumber,
                                        true, true);
        
        expect(await accountMessage.getMessageText()).toBe(AccountMessages.CREATED_MSG);

        await accountMessage.clickContinueButton();

        expect(await header.getName()).toBe(newUser.customerfullname);

        expect(await header.isDeleteUserLinkVisible()).toBeTruthy();

        await deleteUserAndVerify(header, accountMessage);

        expect(page.url()).toBe(urls.base);
        expect(await mainPage.isSliderVisible()).toBeTruthy();     
    });

    test(`register new user without optional fields`, async ( {page} ) => {
        expect(await mainPage.isSliderVisible()).toBeTruthy();

        await header.clickLogin();
        expect(await loginPage.getSignUpFormHeader()).toBe(LoginPageMsg.SIGNUP_FORM_HEADER);
        
        await loginPage.fillAndSubmitLoginForm(newUser.customerfullname, newUser.email);

        expect(await signUpPage.getFormHeader()).toBe(SignUpPageMsg.ACCOUNT_INFORMATION_HEADER);

        await signUpPage.fillAndSubmitSignUpForm(newUser.password, newUser.birthDay, 
                                        newUser.birthMonth, newUser.birthYear, 
                                        newUser.firstName, newUser.lastName, 
                                        '', newUser.address, 
                                        '', newUser.state, 
                                        newUser.city, newUser.zipcode, newUser.mobileNumber, 
                                        false, false);
        expect(await accountMessage.getMessageText()).toBe(AccountMessages.CREATED_MSG);

        await accountMessage.clickContinueButton();

        expect(await header.getName()).toBe(newUser.customerfullname);

        expect(await header.isDeleteUserLinkVisible()).toBeTruthy();

        await deleteUserAndVerify(header, accountMessage);

        expect(page.url()).toBe(urls.base);
        expect(await mainPage.isSliderVisible()).toBeTruthy();  
    });

    test('should not register with invalid email format', async () => { 

    });

    test(`register a new user with existing email`, async ({ page} ) => {
        expect(await mainPage.isSliderVisible()).toBeTruthy();

        await header.clickLogin();
        expect(await loginPage.getSignUpFormHeader()).toBe(LoginPageMsg.SIGNUP_FORM_HEADER);
        
        await loginPage.fillAndSubmitLoginForm(newUser.customerfullname, newUser.email);

        expect(await signUpPage.getFormHeader()).toBe(SignUpPageMsg.ACCOUNT_INFORMATION_HEADER);

        await signUpPage.fillAndSubmitSignUpForm('Mrs', newUser.password, newUser.birthDay, 
                                        newUser.birthMonth, newUser.birthYear, 
                                        newUser.firstName, newUser.lastName, 
                                        newUser.company, newUser.address, 
                                        newUser.address2, newUser.state, 
                                        newUser.city, newUser.zipcode, newUser.mobileNumber,
                                        true, true);

        await accountMessage.clickContinueButton();

        await header.clickLogout();
        
        await header.clickLogin();

        await loginPage.fillAndSubmitLoginForm(newUser.customerfullname, newUser.email);

        expect(await loginPage.getSignUpErrorMessage()).toBe(LoginPageMsg.SIGNUP_ERROR_MSG);

        await header.clickLogin();
        
        await loginPage.fillAndSubmitLoginForm(newUser.email, newUser.password);

        await deleteUserAndVerify(header, accountMessage);

        expect(page.url()).toBe(urls.base);
    });
   
    test.afterAll(async () => {
      //await browser.close();
    });

})
