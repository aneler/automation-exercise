import { type Page, type Locator , expect } from '@playwright/test'; 

class cookiePopup{
    readonly page: Page;
    
    readonly cookieDialog: Locator;
    readonly consentBtn: Locator;
    readonly manageOptionsBtn: Locator;
    //button[@aria-label="Consent"]
 
    //button[@aria-label="Manage options"] 
    constructor (page: Page){
        this.cookieDialog = page.locator(`//div[@role='dialog' and contains(@aria-label, 'consent')]`);
        this.manageOptionsBtn = page.locator(`//button[@aria-label="Manage options"]`);
        this.consentBtn = page.locator(`//button[@aria-label="Consent"]`);
    }

    async isCookieDialogVisible(){
        return await this.cookieDialog.isVisible();
    }

    async clickConsent(){
        await this.consentBtn.click();
    }

    async acceptCookieIfVisible(){
        if (await this.isCookieDialogVisible()){
            await this.clickConsent();
        }
    }
}

export default cookiePopup;