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
let negativeLoginCases: any[] = [];

//let browser: Browser;

test.describe('Login user', () => {

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
    });

    test(`sign up new user and login with correct email and password`, async ( {page} ) => {
        if (await cookiePopup.isCookieDialogVisible()){
            await cookiePopup.clickConsent();
        }
        await header.clickLogin();
        await loginPage.fillAndSubmitSignUpForm(newUser.customerfullname, newUser.email);

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
        expect(await mainPage.isSliderVisible()).toBeTruthy();     
    });
    
    test(`login with existing login and password using header`, async ( {} ) => {
        if (await cookiePopup.isCookieDialogVisible()){
            await cookiePopup.clickConsent();
        }
        await header.clickLogin();
        await loginPage.fillLoginEmail(newUser.email);
        await loginPage.fillLoginPassword(newUser.password);
        await loginPage.clickLoginButton();
        expect(await header.getName()).toBe(newUser.customerfullname);
        await header.clickDeleteUser();
    })

    test(`logout from header`, async ( { page } ) => {
        if (await cookiePopup.isCookieDialogVisible()){
            await cookiePopup.clickConsent();
        }
        await header.clickLogin();
        await loginPage.fillSignUpName(newUser.customerfullname);
        await loginPage.fillSignUpEmail(newUser.email);
        await loginPage.clickSignUpButton();

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
        expect(await loginPage.isLoginFormVisible()).toBeTruthy();
    })
        
    
    const negativeLoginCases = [
        {
            description: 'correct email and wrong password',
            email: () => newUser.email,
            password: 'wrongPassword123',
        },
        {
            description: 'unregistered email and any password',
            email: () => 'nonexistentuser@example.ccc',
            password: 'anyPassword123',
        },
    ];
    
    for (const testCase of negativeLoginCases) {
        test(`should show error for ${testCase.description}`, async ({ page }) => {
            if (await cookiePopup.isCookieDialogVisible()){
                        await cookiePopup.clickConsent();
            }
            await header.clickLogin();
            await loginPage.fillLoginEmail(testCase.email());
            await loginPage.fillLoginPassword(testCase.password);
            await loginPage.clickLoginButton();
            expect(await loginPage.getLoginErrorMessage()).toBe(LoginPageMsg.LOGIN_ERROR_MSG);
            
        });
    }

   
    test.afterAll(async () => {
      //await browser.close();
    });

})
