import { test, expect } from '@playwright/test';
import Header from '../tests/ui/pages/header';
import AccountMessagePage from '../tests/ui/pages/account-message-page';
import { AccountMessages } from '../constants/test-strings';

let header: Header;
let accountMessage: AccountMessagePage;


export async function deleteUserAndVerify(header: Header, accountMessage: AccountMessagePage) {
    await header.clickDeleteUser();
    expect(await accountMessage.getMessageText()).toBe(AccountMessages.DELETED_MSG);
    await accountMessage.clickContinueButton();
}