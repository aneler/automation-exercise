import { type Page, type Locator , expect } from '@playwright/test'; 

class LoginPage {
    readonly page: Page;
    readonly loginForm: Locator;
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    
    readonly signUpFormHeader: Locator;
    readonly signUpName: Locator;
    readonly signUpEmail: Locator;
    readonly signUpButton: Locator;
    readonly signUpErrorMessage: Locator;


    constructor(page: Page){
        this.loginForm = page.locator(`//div[@class="login-form"]`);
        this.loginEmail = page.locator(`//input[@data-qa="login-email"]`);
        this.loginPassword = page.locator(`//input[@data-qa="login-password"]`);
        this.loginButton = page.locator(`//button[@data-qa="login-button"]`);
        this.loginErrorMessage = page.locator(`//form[@action="/login"]/p`);

        this.signUpFormHeader = page.locator(`//div[@class="signup-form"]/h2`);
        this.signUpName = page.locator(`//input[@data-qa="signup-name"]`);
        this.signUpEmail = page.locator(`//input[@data-qa="signup-email"]`);
        this.signUpButton = page.locator(`//button[@data-qa="signup-button"]`);
        this.signUpErrorMessage = page.locator(`//form[@action="/signup"]/p`);
    }
    
    async fillLoginEmail(email: string){
        await this.loginEmail.fill(email);
    }
    async isLoginFormVisible(){
        await this.loginForm.waitFor({ state: 'visible', timeout: 5000 });
        return await this.loginForm.isVisible();
    }

    async fillLoginPassword(password: string){
        await this.loginPassword.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async fillAndSubmitLoginForm(login: string, password: string){
        await this.loginEmail.fill(login);
        await this.loginPassword.fill(password);
        await this.clickLoginButton();
    }

    async getSignUpFormHeader(){
        const text = await this.signUpFormHeader.textContent();
        return text?.trim() || '';
    }
    
    async fillSignUpName(signupname: string){
        await this.signUpName.fill(signupname);
    }

    async fillSignUpEmail(signupemail: string){
        await this.signUpEmail.fill(signupemail);
    }

    async clickSignUpButton(){
        await this.signUpButton.click();
    }

    async fillAndSubmitSignUpForm(customerfullname: string, email: string){
        await this.fillSignUpName(customerfullname);
        await this.fillSignUpEmail(email);
        await this.clickSignUpButton();
    }

    async getLoginErrorMessage(){
        const text = await this.loginErrorMessage.textContent();
        return text?.trim() || '';
    }

    async getSignUpErrorMessage(){
        const text = await this.signUpErrorMessage.textContent();
        return text?.trim() || '';
    }

    async getSignUpEmailValidation(): Promise<{ isValid: boolean, validationMessage: string }> {
    return await this.signUpEmail.evaluate(
        (el: HTMLInputElement) => ({
            isValid: el.validity.valid,
            validationMessage: el.validationMessage
        })
    );
}
}

export default LoginPage;