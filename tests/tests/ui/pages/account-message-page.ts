import { type Page, type Locator , expect } from '@playwright/test';
import { AccountMessages } from '../../../constants/test-strings';

class AccountMessagePage {

    readonly page: Page; 
    readonly continueButton: Locator;
    readonly deletedMessage: Locator;
    readonly createdMessage: Locator;
    readonly messageHeader: Locator;

    constructor(page: Page){
        this.page = page;
        this.continueButton = page.locator(`//a[@data-qa="continue-button"]`);
        //this.deletedMessage = page.locator(`//h2[@data-qa="account-deleted"]`);
        //this.createdMessage = page.locator(`//h2[@data-qa="account-created"]`);
        this.messageHeader = page.locator('h2[data-qa]');

    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async getMessageText(){
        const text = await this.messageHeader.textContent();
        return text?.trim() || '';
    }

    /*async getCreatedMessage(){
        const text = await this.createdMessage.textContent();
        return text?.trim() || '';
    }*/

    async verifyMessage(expectedMessage: string){
        return expect(await this.getMessageText()).toBe(expectedMessage);
    }

    /*async verifyDeletedMessage(){
        return expect(await this.getDeletedMessage()).toBe(AccountMessages.DELETED_MSG);
    }*/
}

export default AccountMessagePage;