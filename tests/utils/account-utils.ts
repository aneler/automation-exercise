import { Browser, expect } from '@playwright/test';
import Header from '../tests/ui/pages/header';
import AccountMessagePage from '../tests/ui/pages/account-message-page';
import LoginPage from '../tests/ui/pages/login-page';
import CookiePopup from '../tests/ui/pages/cookie-popup';
import { AccountMessages } from '../constants/test-strings';
import { urls } from '../constants/urls';
import { UserData } from '../interfaces/user';

export async function deleteUserAndVerify(header: Header, accountMessage: AccountMessagePage) {
    await header.clickDeleteUser();
    expect(await accountMessage.getMessageText()).toBe(AccountMessages.DELETED_MSG);
    await accountMessage.clickContinueButton();
}

export async function loginAndDeleteUser(browser: Browser, user: UserData) {
    const page = await browser.newPage();
    const header = new Header(page);
    const loginPage = new LoginPage(page);
    const cookiePopup = new CookiePopup(page);
    const accountMessage = new AccountMessagePage(page);

    await page.goto(urls.base);

    if (await cookiePopup.isCookieDialogVisible()) {
        await cookiePopup.clickConsent();
    }

    await header.clickLogin();
    await loginPage.fillLoginEmail(user.email);
    await loginPage.fillLoginPassword(user.password);
    await loginPage.clickLoginButton();

    await deleteUserAndVerify(header, accountMessage);
    await page.close();
}